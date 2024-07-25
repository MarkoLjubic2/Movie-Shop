window.addEventListener('load', () => {
    document.getElementById('login').addEventListener('click', (evt) => {
        evt.preventDefault();
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        fetch('http://127.0.0.1:8001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(res => res.json() )
            .then(data => {
                if (data.msg) {
                    if (data.msg === 'User is not an admin') {
                        window.location.href = '/login';
                    }
                }
                else {
                    document.cookie = `token=${data.token};SameSite=Lax`;
                    window.location.href = 'index.html';
                }
            });
    });
});