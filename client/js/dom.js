/*
 * DOM functions
 */

function htmlTuut(data) {
    let d = new Date(Date.parse(data.updated_at));

    let tuutDiv = document.createElement("div");
    tuutDiv.classList.add("tuut");

    let userLink = document.createElement("a");
    userLink.href = "user/" + data.user_id;
    userLink.textContent = data.name;

    userLink.addEventListener('click', (e) => {
        e.preventDefault();

        getUserById(data.user_id).then((response) => {
            if (response.success == "1") {
                console.log(response.data);
                //usersList.appendChild(userCard(response.data));
                usersList.prepend(userCard(response.data));
            }
        });
    })

    let userTitle = document.createElement("h5");
    userTitle.classList.add("tuut-title");
    userTitle.appendChild(userLink);

    let tuutMeta = document.createElement("p");
    tuutMeta.classList.add("tuut-meta");
    tuutMeta.textContent = d.toLocaleString();
    
    let tuutBody = document.createElement("p");
    tuutBody.classList.add("tuut-body");
    tuutBody.textContent = data.body;
    
    tuutDiv.appendChild(userTitle);
    tuutDiv.appendChild(tuutMeta);
    tuutDiv.appendChild(tuutBody);

    return tuutDiv;
}

function toggle(element) {
    element.classList.toggle("hidden");
}

function alertMessage(element, message) {
    element.textContent = message;
    toggle(element);
    setInterval(() => {
        element.textContent = "";
        toggle(element);
    }, 3000);
}

function paginate(pageCount) {
    // massor med duplicerad kod, orka
    let paginationUl = document.getElementById("pagination");
    if (!paginationUl) {
        paginationUl = document.createElement('ul');
    }
    paginationUl.classList.add("pagination");
    paginationUl.id = "pagination";

    let paginationPreLi = document.createElement('li');
    let paginationPreLink = document.createElement('a');
    paginationPreLink.href = "#";
    paginationPreLink.textContent = "<";
    paginationPreLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage--;
        getTuuts(currentPage).then((response) => {
            if (response.success == "1") {
                tuutsStream.innerHTML = "";
                response.data.forEach(tuut => {
                    tuutsStream.appendChild(htmlTuut(tuut));
                });
                currentPage = response.currentPage;
                paginate(response.pageCount);
            }
        });
    });
    paginationPreLi.appendChild(paginationPreLink);
    paginationPreLi.classList.add("page-item");
    paginationUl.appendChild(paginationPreLi);

    for (let i = 0; i < pageCount; i++) {
        let paginationLi = document.createElement('li');
        let paginationLink = document.createElement('a');
        paginationLink.href = "#";
        paginationLink.textContent = i;
        paginationLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            getTuuts(currentPage).then((response) => {
                if (response.success == "1") {
                    tuutsStream.innerHTML = "";
                    response.data.forEach(tuut => {
                        tuutsStream.appendChild(htmlTuut(tuut));
                    });
                    currentPage = response.currentPage;
                    paginate(response.pageCount);
                }
            });
        });
        paginationLi.appendChild(paginationLink);
        paginationLi.classList.add("page-item");
        if (currentPage == i) {
            paginationLi.classList.add("active");
        }
        paginationUl.appendChild(paginationLi);
    }

    let paginationNextLi = document.createElement('li');
    let paginationNextLink = document.createElement('a');
    paginationNextLink.href = "#";
    paginationNextLink.textContent = ">";
    paginationNextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pageCount - 1) {
            currentPage++;
        }

        getTuuts(currentPage).then((response) => {
            if (response.success == "1") {
                tuutsStream.innerHTML = "";
                response.data.forEach(tuut => {
                    tuutsStream.appendChild(htmlTuut(tuut));
                });
                currentPage = response.currentPage;
                paginate(response.pageCount);
            }
        });
    });
    paginationNextLi.appendChild(paginationNextLink);
    paginationNextLi.classList.add("page-item");
    paginationUl.appendChild(paginationNextLi);

    tuutsStream.appendChild(paginationUl);
}

function userCard(data) {
    let card = document.createElement("div");
    card.classList.add("card");

    let imgDiv = document.createElement("div");
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img");
    cardImg.src = "https://robohash.org/" + data.name;
    imgDiv.appendChild(cardImg);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = data.name;
    let cardTitleSmall = document.createElement("small");
    cardTitleSmall.textContent = data.email;
    cardTitle.appendChild(cardTitleSmall);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = data.bio ? data.bio : "";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(imgDiv);
    card.appendChild(cardBody);

    return card;
}