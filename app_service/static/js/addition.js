let id = null;
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


window.addEventListener("load", function(){

    let url = new URL( window.location.href );
    id = url.searchParams.get("id");

    fetch(`http://localhost:8000/addition/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( resp=>resp.json() )
        .then( data=>{
            document.getElementById("title").value = data.title;
        })
        .catch(err=>console.log(err));


    function validation() {
        let input = document.getElementById("title");
        let inputValue = input.value;
        if (inputValue.length < 2) {
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

    document.getElementById("form").addEventListener("submit", function(event){

        event.preventDefault();
        if(!validation()){
            alert("Data is not valid!");
            return;
        }

        let newAddition = {
            title: document.getElementById("title").value
        };

        fetch("http://localhost:8000/addition/", {
            method:"POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newAddition)
        })
            .then(succ=>succ.json())
            .then(()=>{

                window.location.href='/administrator/additions.html'
            })
            .catch(err => console.log(err));
    });

    this.document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault();
        if(!validation()){
            alert("Data is not valid!");
            return;
        }

        let newAddition = {
            title: document.getElementById("title").value
        }
        fetch(`http://localhost:8000/addition/${id}`, {
            method:"PUT",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(newAddition)
        })
            .then(succ=>succ.json())
            .then(()=>{
                window.location.href=`/administrator/additions.html`;
            })
            .catch(err => console.log(err));
    });

    document.getElementById("title").addEventListener("keypress", function(){
        this.classList.remove('success');
        this.classList.remove('error');
    });

    document.getElementById("delete").addEventListener("click", function() {
        if( confirm("Confirm deletion") ){
            fetch(`http://localhost:8000/addition/${id}`, {
                headers: {'Authorization': `Bearer ${token}`},
                method:"DELETE"
            })
                .then( resp=>resp.json())
                .then(data=>{
                alert("Data is deleted " + data);
                window.location.href=`/administrator/additions.html`;
            })
                .catch( err=>console.log(err));
        }

    });

});



