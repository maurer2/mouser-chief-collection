import os
import sys
import json
import re

from typing import Any, IO


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def get_keys(entries: list) -> list:
    keys = entries[0]

    keys_without_refs = keys[:]
    keys_without_refs.remove("Refs")

    return keys_without_refs


def get_entries(entries: list) -> list:
    entries_without_keys = entries[:]

    entries_without_keys.pop(0)

    return entries_without_keys


def clean_entries(entries) -> list:
    # remove [x]
    cleaned_entries: list = [(re.sub(r"\[.*?\]", "", entry)) for entry in entries]

    # convert comma separated entries in string to real list
    cleaned_entries = [
        entry.split(",") if entry.count(",") > 0 else entry for entry in cleaned_entries
    ]

    # trim
    # cleaned_entries = [entry.strip() for entry in cleaned_entries]

    return cleaned_entries


def get_entries_mapped_with_keys(keys: list, entries: list) -> Any:
    mapped_key_value: dict = dict(zip(keys, entries))

    return mapped_key_value


def write_values_to_file(entries: list) -> None:
    with open("./data/data_parsed.json", "w+", encoding="utf-8") as file:
        json.dump(entries, file, ensure_ascii=False, indent=2)


def main() -> None:
    file_name: str = "../data/data_unparsed.json"
    file_content: str = get_file_contents(file_name)

    parsed_values: dict = json.loads(file_content)

    entries_all: list = parsed_values["entries"]

    keys: list = get_keys(entries_all)
    entries: list = get_entries(entries_all)

    cleaned_entries = [clean_entries(entry) for entry in entries]

    mapped_entries = [
        get_entries_mapped_with_keys(keys, entry) for entry in cleaned_entries
    ]

    write_values_to_file(mapped_entries)

    print(mapped_entries)


if __name__ == "__main__":
    main()
