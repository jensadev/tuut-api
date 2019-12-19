# Tuut api

Ett API exempel för att lära ut REST, routes osv. i webbkurser.
Osäkert och CORS.

Ladda ned clienten och prova mot API, designa den som du vill.
https://github.com/jensnti/tuut-client

## Starta

Typ detta

    git clone
    cd tuut-api
    npm install
    cp .env_example .env
    nano .env

    mysql -u -p
    create database tuut-api;
    exit
    mysql -u -p tuut.-api < tuut.sql

    nodemon start

## Vad kan du göra?

* @mentions
* Kommentarer på en tråd
* likes

## TODO

* Validation
* Security