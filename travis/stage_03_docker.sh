#!/bin/bash

# Docker build and Deploy
export DOCKER_TAG=2.0

docker build -f Dockerfile -t glaciar/glaciar-front:"$DOCKER_TAG" .

echo "$GLACIAR_DOCKER_PASS" | docker login -u "$GLACIAR_DOCKER_USER" --password-stdin

docker push glaciar/glaciar-front:"$DOCKER_TAG"

# Git tag commit
git config --local user.name "VIA-GlaciaR"
git config --local user.email "pablo.inchausti.edu@gmail.com"
git tag "videmaf-$(git log --format=%h -1)-$DOCKER_TAG"




