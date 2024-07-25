const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function dataFetch() {

    fetch('http://localhost:8000/addition/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("list");

            data.forEach(addition => {
                let tr = document.createElement("tr");

                let tdTitle = document.createElement("td");
                tdTitle.innerHTML = addition.title;
                tr.appendChild(tdTitle);

                let td = document.createElement("td");
                let editLink = document.createElement("a");
                editLink.className = "btn btn-primary";
                editLink.href = `addition.html?id=${addition.id}`;
                editLink.innerHTML = "Change";

                td.appendChild(editLink);
                tr.appendChild(td);

                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener("load", dataFetch);