import os
import sys

from typing import Any, IO
from requests_html import HTMLSession

URL = "https://en.wikipedia.org/wiki/Chief_Mouser_to_the_Cabinet_Office"


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
    markup: str = get_markup(URL)
    write_file(markup)
