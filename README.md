# lamas-project

API_PORT=4000 docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

push8

scott@hotmail.fr
a72320@hotmail.fr
CogitoErgoSum72%

rm -Rf node_modules/.cache

#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git reset --hard origin/main && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yml -f docker-compose.staging.yml up --build -d
