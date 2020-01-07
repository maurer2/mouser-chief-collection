import os
import sys
import json


from typing import Any, IO
from bs4 import BeautifulSoup


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def get_table(markup: str) -> str:
    parsed_content = BeautifulSoup(markup, "html.parser")

    table: str = parsed_content.select_one("#bodyContent table.wikitable")

    return table


def get_rows(table: Any) -> list:
    rows: list = table.find_all("tr")

    return rows


def get_values(row: Any) -> list:
    columns: list = row.find_all(["th", "td"])

    values: list = [column.get_text(strip=True) for column in columns]

    return values


def get_json(values: Any) -> json:
    values_stringified = json.dumps(values, indent=2)

    return values_stringified


def print_debug_info(entries: Any) -> None:
    for entry in entries:
        values: list = get_values(entry)

        stringified_entries = get_json(values)

        print(stringified_entries)


def main() -> None:
    file_name: str = "../data/raw.html"
    file_content: str = get_file_contents(file_name)

    table: str = get_table(file_content)
    table_rows: list = get_rows(table)

    print_debug_info(table_rows)


if __name__ == "__main__":
    main()
