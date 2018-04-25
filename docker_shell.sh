#!/bin/sh
docker run -p 1313:1313 --volume $(pwd):/app -it cucumber/hugo:d37f116e8662c671283a116b35f21991 $@
