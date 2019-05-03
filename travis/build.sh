#!/bin/bash

# Script that depends on branch #879
# https://github.com/travis-ci/travis-ci/issues/879


echo "[travis/build.sh] TRAVIS_BRANCH=${TRAVIS_BRANCH} "

  if [[ $TRAVIS_BRANCH == 'develop' ]]; then
    ng build --aot 
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
    ng build --aot --configuration production
else
    ng build --aot 
fi



