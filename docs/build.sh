#!/bin/bash
WD=$(dirname $(readlink -f $0))

if [[ "$(docker images -q jekyll/jekyll 2> /dev/null)" == "" ]]; 
then
    docker pull jekyll/jekyll
fi

# export JEKYLL_VERSION=3.8
# docker run --rm \
#   --volume="$WD:/srv/jekyll:Z" \
#   -it jekyll/jekyll \
#   bundle exec jekyll serve

# docker run \
#   -itd ubunut \
#   --volume="$WD:/root/test" \
#   /bin/bash

docker run -itd \
    -v $WD:/root/test \
    jekyll/jekyll /bin/bash