import os
import sys
import json
import re
import humps

from typing import IO, NamedTuple, TypeAlias, TypedDict

MouserChiefListEntry = NamedTuple(
    "MouserChiefListEntry",
    name=str,
    beganTenure=str,
    endTenure=str,
    primeMinisters=list[str],
    rubbish=str,
)
MouserChiefList: TypeAlias = list[MouserChiefListEntry]

MouserChiefListEntryType = TypedDict(
    "MouserChiefListEntryType",
    {"name": int, "beganTenure": str, "endTenure": str, "primeMinisters": list[str]},
)
MouserChiefListObject: TypeAlias = list[dict[str, MouserChiefListEntryType]]


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def get_keys(entries: list[str]) -> list[str]:
    keys: list = entries[0].copy()

    keys.remove("Refs")
    keys_formatted = [i.replace("(s)", "s") for i in keys]
    keys_camel_case = [humps.camelize(i.replace(" ", "-")) for i in keys_formatted]

    return keys_camel_case


def get_entries(entries: list[str]) -> list[str]:
    entries_without_keys = entries.copy()
    entries_without_keys.pop(0)

    return entries_without_keys


def clean_entry(entries: list[str]) -> MouserChiefListEntry:
    # remove [x]
    cleaned_entries = [(re.sub(r"\[.*?\]", "", entry)) for entry in entries]

    # trim
    cleaned_entries = [entry.strip() for entry in cleaned_entries]

    # normalize commas for next step
    cleaned_entries = [entry.replace(", ", ",") for entry in cleaned_entries]

    # convert comma separated entries if prime ministers to list of strings
    cleaned_entries_as_tuple = tuple(
        [
            entry.split(",") if cleaned_entries.index(entry) == 3 else entry
            for entry in cleaned_entries
        ]
    )

    return cleaned_entries_as_tuple


def move_incumbent_to_end_of_list(entries: MouserChiefList) -> MouserChiefList:
    entries_without_incumbent = [entry for entry in entries if entry[2] != "current"]
    entry_of_incumbent = [entry for entry in entries if entry[2] == "current"]

    ordered_list = entries_without_incumbent + entry_of_incumbent

    return ordered_list


def get_values_mapped_with_keys(
    keys: list[str], entry: MouserChiefListEntry
) -> MouserChiefListObject:
    mapped_key_value = dict(zip(keys, entry))

    return mapped_key_value


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

    cleaned_entries: MouserChiefList = [clean_entry(entry) for entry in entries]

    ordered_entries: MouserChiefList = move_incumbent_to_end_of_list(cleaned_entries)

    mapped_entries = [
        get_values_mapped_with_keys(keys, entry) for entry in ordered_entries
    ]

    write_values_to_file(mapped_entries)

    # print('Debug list:', *mapped_entries, sep='\n- ')


if __name__ == "__main__":
    main()
