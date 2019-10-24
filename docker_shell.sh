#!/bin/sh
docker run -p 1313:1313 -e "CI=${CI:-false}" --volume $(pwd):/app -it cucumber/hugo:1e65815e43ac30f7d52080356fd0893a $@
