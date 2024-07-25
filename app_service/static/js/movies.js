 const cookies = document.cookie.split('=');
 const token = cookies[cookies.length - 1];

function fetchData(url, token) {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json());
}

function createTableRow(movie, category) {
    let tr = document.createElement("tr");

    let tdTitle = document.createElement("td");
    tdTitle.innerHTML = movie.title;
    tr.appendChild(tdTitle);

    let tdDescription = document.createElement("td");
    tdDescription.innerHTML = movie.description;
    tr.appendChild(tdDescription);

    let tdCategory = document.createElement("td");
    tdCategory.innerHTML = category.title;
    tr.appendChild(tdCategory);

    let tdPrice = document.createElement("td");
    tdPrice.innerHTML = movie.price;
    tr.appendChild(tdPrice);

    let td5 = document.createElement("td");
    let editLink = document.createElement("a");
    editLink.className = "btn btn-primary";
    editLink.href = `movie.html?id=${movie.id}`;
    editLink.innerHTML = "Change";

    td5.appendChild(editLink);
    tr.appendChild(td5);

    return tr;
}

function dataFetch() {
    fetchData('http://localhost:8000/movie/', token)
        .then(data => {
            const tableBody = document.getElementById("list");

            const promises = data.map(movie => {
                    return fetchData(`http://localhost:8000/category/${movie.category_id}`, token)
                        .then(category => ({movie, category}));
                }
            );

            Promise.all(promises)
                .then(results => {
                    results.forEach(({ movie, category }) => {
                        let tr = createTableRow(movie, category);
                        tableBody.appendChild(tr);
                    });
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener("load", dataFetch);