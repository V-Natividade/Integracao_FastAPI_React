#!/bin/bash

cd server/backend/

touch .env
echo "SECRET_KEY='314e76b568c64dee9a0807c4ebd36b2eaec292ec5d59674299623e3228fa9021'" >> .env
echo "POSTGRES_USER='postgres'" >> .env
echo "POSTGRES_PASSWORD='postgres'" >> .env
echo "POSTGRES_SERVER=db" >> .env
echo "POSTGRES_PORT=5432" >> .env
echo "POSTGRES_DB='postgres'" >> .env