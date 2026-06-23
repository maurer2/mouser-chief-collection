import os
import sys
import json

from typing import IO


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def write_values_to_file(entries: dict) -> None:
    with open("./data/data_normalized.json", "w+", encoding="utf-8") as file:
        json.dump(entries, file, ensure_ascii=False, indent=2)


# Convert array of entries to a map where each name is a top level key with one or more tenures
def main() -> None:
    file_name: str = "../data/data_parsed.json"
    file_content: str = get_file_contents(file_name)
    file_parsed: list = json.loads(file_content)

    keyed_entries: dict[str, list] = {}
    for item in file_parsed:
        name = item["name"]

        # omit name property as it is redundant
        tenure_fields = {key: value for key, value in item.items() if key != "name"}

        # cat can serve multiple terms -> array/list
        # setdefault = getOrInsert in js
        keyed_entries.setdefault(name, []).append(tenure_fields)

    write_values_to_file(keyed_entries)


if __name__ == "__main__":
    main()
