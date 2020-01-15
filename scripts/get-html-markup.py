import os
import sys
import argparse


from typing import Any, IO
from requests_html import HTMLSession


def get_markup(link: str) -> str:
    session: Any = HTMLSession()
    url_response: Any = session.get(link)

    return url_response.text


def write_file(text: str) -> None:
    path: str = os.path.join(sys.path[0], "../data/raw.html")
    file: IO = open(path, "w+")

    file.write(text)
    file.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-url", "--url", help="url to dump", action="store")
    parsed_args = parser.parse_args()

    passed_url: str = parsed_args.url
    markup: str = get_markup(passed_url)

    write_file(markup)
