import os
import sys
import json


from typing import Any, IO


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def get_entry_with_key(key: str, entry: Any) -> dict:
    return entry[key]


def write_values_to_file(entries: dict) -> None:
    with open("./data/data_flattened.json", "w+", encoding="utf-8") as file:
        json.dump(entries, file, ensure_ascii=False, indent=2)


def main() -> None:
    file_name: str = "../data/data_parsed.json"
    file_content: str = get_file_contents(file_name)
    file_parsed: str = json.loads(file_content)

    keyed_entries: dict = {
        get_entry_with_key("name", item): item for item in file_parsed
    }

    write_values_to_file(keyed_entries)


if __name__ == "__main__":
    main()
