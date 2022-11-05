#!/bin/bash
WD=$(dirname $(readlink -f $0))

if [[ "$(docker images -q jekyll/jekyll 2> /dev/null)" == "" ]]; 
then
    docker pull jekyll/jekyll
fi

# export JEKYLL_VERSION=3.8
docker run \
  --volume="$WD:/srv/jekyll:Z" \
  --name jekyll \
  -it jekyll/jekyll \
  jekyll build