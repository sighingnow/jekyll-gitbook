#!/bin/bash;
wd=$(dirname $(readlink -f $0));
docker run -d --name ruby ruby 