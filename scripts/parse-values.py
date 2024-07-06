import os
import sys
import json
import re
import humps

from typing import IO, NamedTuple, TypeAlias, TypedDict, cast

MouserChief = NamedTuple(
    "MouserChief",
    [
        ("name", str),
        ("beganTenure", str),
        ("endedTenure", str),
        ("primeMinisters", list[str]),
        ("rubbish", str),
    ],
)

MouserChiefListEntry = TypedDict(
    "MouserChiefListEntry",
    {"name": str, "beganTenure": str, "endedTenure": str, "primeMinisters": list[str]},
)
MouserChiefList: TypeAlias = list[dict[str, MouserChiefListEntry]]


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def get_keys(entries: list[list[str]]) -> list[str]:
    keys: list = entries[0].copy()

    keys.remove("Refs")
    keys_formatted = [i.replace("(s)", "s") for i in keys]
    keys_camel_case = [humps.camelize(i.replace(" ", "-")) for i in keys_formatted]

    return keys_camel_case


def get_entries(entries: list[list[str]]) -> list[list[str]]:
    entries_without_keys = entries.copy()
    entries_without_keys.pop(0)

    return entries_without_keys


def clean_entry(entries: list[str]) -> list[str]:
    # remove [x]
    cleaned_entries = [(re.sub(r"\[.*?\]", "", entry)) for entry in entries]

    # trim
    cleaned_entries = [entry.strip() for entry in cleaned_entries]

    # normalize commas for next step
    cleaned_entries = [entry.replace(", ", ",") for entry in cleaned_entries]

    return cleaned_entries


def move_incumbent_to_end_of_list(entries: list[list[str]]) -> list[list[str]]:
    entries_without_incumbent = [entry for entry in entries if entry[2] != "current"]
    entry_of_incumbent = [entry for entry in entries if entry[2] == "current"]

    ordered_list = entries_without_incumbent + entry_of_incumbent

    return ordered_list


def get_values_mapped_with_keys(
    keys: list[str], entry: list[str]
) -> MouserChiefListEntry:

    exploded_entry = tuple(
        [field.split(",") if entry.index(field) == 3 else field for field in entry]
    )

    mapped_key_value = dict(zip(keys, exploded_entry))

    mapped_entry: MouserChiefListEntry = {
        "name": str(mapped_key_value["name"]),
        "beganTenure": str(mapped_key_value["beganTenure"]),
        "endedTenure": str(mapped_key_value["endedTenure"]),
        "primeMinisters": list(mapped_key_value["primeMinisters"]),
    }

    return mapped_entry


def write_values_to_file(entries: list) -> None:
    with open("./data/data_parsed.json", "w+", encoding="utf-8") as file:
        json.dump(entries, file, ensure_ascii=False, indent=2)


def main() -> None:
    file_name: str = "../data/data_unparsed.json"
    file_content: str = get_file_contents(file_name)

    parsed_values: dict = json.loads(file_content)

    entries_all: list[list[str]] = parsed_values["entries"]

    keys: list[str] = get_keys(entries_all)
    entries: list[list[str]] = get_entries(entries_all)

    cleaned_entries: list[list[str]] = [clean_entry(entry) for entry in entries]
    ordered_entries: list[list[str]] = move_incumbent_to_end_of_list(cleaned_entries)

    mapped_entries: MouserChiefList = cast(
        MouserChiefList,
        [get_values_mapped_with_keys(keys, entry) for entry in ordered_entries],
    )

    write_values_to_file(mapped_entries)

    # print('Debug list:', *mapped_entries, sep='\n- ')


if __name__ == "__main__":
    main()
