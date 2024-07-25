let id = null;
import { parseCookies } from './utils.js';
const cookies = parseCookies();
const token = cookies.token;

window.addEventListener("load", function(){

    let url = new URL( window.location.href );
    id = url.searchParams.get("id");

    fetch(`http://localhost:8000/category/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp=>resp.json())
        .then(data=>{
            document.getElementById("title").value = data.title;
        })
        .catch(err=>console.log(err));


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

    this.document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault();
        if(!validation()){
            alert("Data is not valid!");
            return;
        }

        let newCategory = {
            title: document.getElementById("title").value
        };

        let url = id ? `http://localhost:8000/category/${id}` : "http://localhost:8000/category/";
        let method = id ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newCategory)
        })
            .then(succ=>succ.json())
            .then(()=>{
                window.location.href=`/administrator/categories.html`;
            })
            .catch(err => console.log(err));
    });

    document.getElementById("title").addEventListener("keypress", function(){
        this.classList.remove('success');
        this.classList.remove('error');
    });

    let deleteButton = document.getElementById("delete");
    if (deleteButton) {
        document.getElementById("delete").addEventListener("click", function () {
            if (confirm("Confirm deletion")) {
                fetch(`http://localhost:8000/category/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    method: "DELETE"
                })
                    .then(resp => resp.json()).then(data => {
                    alert("Data is deleted " + data);
                    window.location.href = `/administrator/categories.html`;
                })
                    .catch(err => console.log(err));
            }

        });

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
            .catch(error => console.error("Error:", error));
    }

});



