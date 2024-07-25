function parseCookies() {
    const cookieArray = document.cookie.split('; ');
    const cookies = {};
    cookieArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookies[name] = value;
    });
    return cookies;
}

export { parseCookies };