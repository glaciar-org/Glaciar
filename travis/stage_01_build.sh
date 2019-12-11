#!/bin/bash

npm install -g @angular/cli

if [[ $TRAVIS_BRANCH == 'master' ]]; then
    ng build --aot --configuration production
else
    ng build --aot  
fi



