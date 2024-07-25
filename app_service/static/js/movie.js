let id = null;
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


window.addEventListener("load", function(){

    fetch('http://localhost:8000/category', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const categories = document.getElementById('category-list');

            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.title;

                categories.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));

    fetch('http://localhost:8000/addition', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const additions = document.getElementById('addition-list');

            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.title;

                additions.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));



    let url = new URL( window.location.href );
    id = url.searchParams.get("id");

    if (id) {
        fetch(`http://localhost:8000/movie/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( resp=>resp.json() )
            .then( data=>{
                populateMovieFields(data)
            })
            .catch(err=>console.log(err));
    }

    function populateMovieFields(data) {
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("price").value = data.price;
        document.getElementById("category-list").value = data.category_id;
        if(data.movieAdditions)
            for (let i = 0; i < data.movieAdditions.length; i++)
                addAddition(data.movieAdditions[i].addition_id);
    }

    function validation() {
        let input = document.getElementById("title");
        let inputValue = input.value;
        if (inputValue.length < 3) {
            input.classList.add("error");
            input.classList.remove("success");
            return false;
        }
        else {
            input.classList.add("success");
            input.classList.remove("error");
            return true;
        }
    }

    document.getElementById("save").addEventListener("click", function(event) {
        event.preventDefault();
        let valid = validation();
        if(!valid){ return; }

        let newMovie = {}
        newMovie.title = document.getElementById("title").value;
        newMovie.description = document.getElementById("description").value;
        newMovie.price = document.getElementById("price").value;
        newMovie.category_id = document.getElementById("category-list").value;
        let url = id ? `http://localhost:8000/movie/${id}` : `http://localhost:8000/movie`;
        let method = id ? "PUT" : "POST";

        if (id)
            updateMovie(url, method, newMovie);
         else
            addMovie(url, method, newMovie);
    });

    function addMovie(url, method, newMovie) {
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newMovie)
        })
            .then(succ=>succ.json())
            .then((movie)=>{
                console.log('Redirecting to movies page');
                window.location.href = '/administrator/movies.html';
            })
            .catch(err => console.log(err));
    }

    function updateMovie(url, method, newMovie) {
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newMovie)
        })
            .then(succ=>succ.json())
            .then((movie)=>{
                let additionIds = getAdditionIds();
                additionIds.forEach(additionId => {
                    let movieAddition = {
                        movie_id: movie.id,
                        addition_id: additionId
                    };
                    fetch('http://localhost:8000/movieadditions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(movieAddition)
                    })
                        .catch(err => console.log(err));
                });
                console.log('Redirecting to movies page');
                window.location.href = '/administrator/movies.html';
            })
            .catch(err => console.log(err));
    }

    function getAdditionIds() {
        const additions = document.getElementById("additions").children;
        let additionIds = [];
        for (let i = 0; i < additions.length; i++) {
            if (additions[i].dataset.additionId) {
                additionIds.push(additions[i].dataset.additionId);
            }
        }
        return additionIds;
    }

    document.getElementById("title").addEventListener("keypress", function(){
        this.classList.remove('success');
        this.classList.remove('error');
    });

    let addAdditionBtn = document.getElementById("add-addition");
    if (addAdditionBtn) {
        document.getElementById("add-addition").addEventListener("click", function () {
            let id = document.getElementById("addition-list").value;
            if (!id) {
                alert("Choose addition");
                return;
            }
            addAddition(id);
        });
    }

        document.getElementById("delete").addEventListener("click", function () {
            if (confirm("Confirm deletion")) {
                fetch(`http://localhost:8000/movie/${id}`, {
                    headers: {'Authorization': `Bearer ${token}`},
                    method: "DELETE"
                })
                    .then(resp => resp.json()).then(data => {
                    alert("Data is deleted " + data);
                    window.location.href = `/movies.html`;
                })
                    .catch(err => console.log(err));
            }
        });
    function addAddition(addition_id) {
        document.querySelector(`#addition-list > option[value='${addition_id}']`).disabled = true;
        document.getElementById("addition-list").selectedIndex = 0;

        let title = document.querySelector(`#addition-list > option[value='${addition_id}']`).innerHTML;
        let span = document.createElement("span");
        span.classList.add("badge", "bg-secondary");
        span.dataset.additionId = addition_id;
        span.innerHTML = title;

        let button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-default", "btn-sm");
        button.innerHTML = "X";

        span.appendChild(button);
        document.getElementById("additions").appendChild(span);
        document.getElementById("additions").appendChild(document.createTextNode(" "));

        button.addEventListener("click", function() {
            let additionId = this.parentNode.dataset.additionId;

            fetch(`http://localhost:8000/movieadditions`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ movie_id: id, addition_id: additionId }),
            })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return resp.json();
                })
                .then(data => {
                    console.log("Deleted data:", data);
                    this.parentNode.parentNode.removeChild(this.parentNode);
                    document.querySelector(`#addition-list > option[value='${additionId}']`).disabled = false;
                })
                .catch(err => console.error("Error:", err));
        });
    }

});



