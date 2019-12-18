/*
 * DOM functions
 */

function htmlTuut(data) {
    let d = new Date(Date.parse(data.updated_at));

    let tuutDiv = document.createElement("div");
    tuutDiv.classList.add("tuut");

    let userLink = document.createElement("a");
    userLink.href = "user.html?id=" + data.user_id;
    userLink.textContent = data.name;

    let userTitle = document.createElement("h2");
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
    let paginationUl = document.getElementById("pagination");
    if(!paginationUl)
        paginationUl = document.createElement('ul');

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

    for(let i = 0; i < pageCount; i++) {
        let paginationLi = document.createElement('li');
        let paginationLink = document.createElement('a');
        paginationLink.href = "#";
        paginationLink.textContent = i;
        paginationLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            console.log(currentPage);
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
        if (currentPage == i)
            paginationLi.classList.add("active");
        paginationUl.appendChild(paginationLi);
    }

    let paginationNextLi = document.createElement('li');
    let paginationNextLink = document.createElement('a');
    paginationNextLink.href = "#";
    paginationNextLink.textContent = ">";
    paginationNextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pageCount - 1)
            currentPage++;
    
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