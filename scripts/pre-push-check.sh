#!/bin/bash
set -e

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ "$branch" == "master" ]
then
    npm run lint:ci
fi


# based on:
# https://blog.theodo.fr/2018/07/protect-git-branches-husky/