#!/bin/bash

export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
sleep 3
fluxbox >/dev/null 2>&1 &

npm run test -- --no-watch --no-progress    \
             --source-map=false   \
             --browsers=ChromeHeadlessCI





