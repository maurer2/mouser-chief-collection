import os
import sys

from requests_html import HTMLSession

URL = "https://en.wikipedia.org/wiki/Chief_Mouser_to_the_Cabinet_Office"


def get_markup(link: str) -> str:
    session = HTMLSession()
    url_response = session.get(link)

    return url_response.text


def write_file(text: str) -> None:
    path = os.path.join(sys.path[0], "../data/raw.htm")
    file = open(path, "w+")
    file.write(text)
    file.close()


MARKUP = get_markup(URL)

write_file(MARKUP)
