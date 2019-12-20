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

    npm start

eller

    npm install -g nodemon
    nodemon start

Om allt fungerat så bör ditt API nu finnas på localhost:3000
Kolla om det är uppe på / routen, resten finns under /users och /tuuts

## Vad kan du göra?

* @mentions
* Kommentarer på en tråd
* likes

## TODO

* Validation
* Security