import os
import sys
import json
from typing import Any, IO
from bs4 import BeautifulSoup, Tag, PageElement, ResultSet


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def get_table(markup: str) -> Tag | None:
    parsed_content = BeautifulSoup(markup, "html.parser")

    table: Tag | None = parsed_content.select_one("#bodyContent table.wikitable")

    return table


def get_rows(table: Tag) -> list[Tag]:
    rows_untyped: ResultSet[PageElement] = table.find_all("tr")

    rows = [row for row in rows_untyped if isinstance(row, Tag)]

    return rows


def get_values(row: Tag) -> list[str]:
    columns: list = row.find_all(["th", "td"])

    values: list = []
    # values: list = [column.get_text(strip=True) for column in columns]
    for column in columns:
        column_span: int = int(column.get("colspan") or 1)
        column_content: str = column.get_text(strip=True).strip()

        values.append(column_content)

        values.extend(["" for i in range(column_span - 1)])

    return values


def get_entries(values_raw: list[Tag]) -> list[list[str]]:
    entries: list = [get_values(value) for value in values_raw]

    return entries


def print_debug_info(entries: Any) -> None:
    stringified_entries = json.dumps(entries)

    print(stringified_entries)


def write_values_to_file(entries: list[list[str]]) -> None:
    nested_values = {}
    nested_values["entries"] = entries

    with open("./data/data_unparsed.json", "w+", encoding="utf-8") as file:
        json.dump(nested_values, file, ensure_ascii=False, indent=2)


def main() -> None:
    file_name: str = "../data/raw.html"
    file_content: str = get_file_contents(file_name)

    table: Tag | None = get_table(file_content)
    if table is None:
        print("table can't be found")
        sys.exit(1)
    table_rows: list[Tag] = get_rows(table)

    parsed_entries: list[list[str]] = get_entries(table_rows)

    write_values_to_file(parsed_entries)
    # print_debug_info(parsed_entries)


if __name__ == "__main__":
    main()
