import os
import sys

from typing import Any, IO
from bs4 import BeautifulSoup


def get_file_contents(file_name: str) -> str:
    path: str = os.path.join(sys.path[0], file_name)
    file: IO = open(path, "r")
    file_contents: str = file.read()
    file.close()

    return file_contents


def extract_table(content: str) -> str:
    parsed_content = BeautifulSoup(content, "html.parser")

    tables: list = parsed_content.select("table.wikitable")
    table: str = tables[0]

    return table


def extract_rows(content: Any) -> list:
    rows: list = content.find_all("tr")

    return rows


def extract_values(row: Any) -> list:
    # th and td
    columns: list = row.find_all(recursive=False)

    columns_without_tags: list = [column.find(text=True) for column in columns]

    return columns_without_tags


if __name__ == "__main__":
    file_name: str = "../data/raw.html"
    file_content: str = get_file_contents(file_name)

    extracted_table: str = extract_table(file_content)

    extracted_rows: list = extract_rows(extracted_table)

    for extracted_row in extracted_rows:
        extracted_values: list = extract_values(extracted_row)

        print(extracted_values)
