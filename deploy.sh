#!/usr/bin/env sh

# abort on errors
set -e

cd vue3

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:maurer2/mouser-chief-collection.git master:gh-pages

cd -
