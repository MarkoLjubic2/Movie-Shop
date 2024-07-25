let id = null;
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

window.addEventListener("load", async function(){
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    try {
        const order = await fetch(`http://localhost:8000/order/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.json());

        document.querySelector(".row dt:nth-child(1) + dd").textContent = order.scheduled_time;
        document.querySelector(".row dt:nth-child(3) + dd").textContent = order.address;

        const selectElement = document.querySelector("#status");
        const matchingOption = Array.from(selectElement.options).find(option => option.text === order.status);
        if (matchingOption) matchingOption.selected = true;

        selectElement.addEventListener('change', async function(event) {
            const newStatus = this.options[this.selectedIndex].text;
            const response = await fetch(`http://localhost:8000/order/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                console.error('Error:', response.status, response.statusText);
            }
        });

        const orderItems = await fetch(`http://localhost:8000/orderitem?order_id=${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.json());

        const movieItems = await Promise.all(orderItems.map(item =>
            fetch(`http://localhost:8000/movie/${item.movie_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => response.json())
                .then(movie => ({...item, movie: movie}))
        ));

        document.querySelector("#content").innerHTML = movieItems.map(item =>
            item.movie_id ? `- ${item.movie.title} (x${item.quantity})` : ''
        ).join('<br>');

        document.querySelector(".row dt:nth-child(7) + dd").textContent =
            movieItems.reduce((total, item) => total + item.price * item.quantity, 0);
    } catch (error) {
        console.error('Error:', error);
    }
});