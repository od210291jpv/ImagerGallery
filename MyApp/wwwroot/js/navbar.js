'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const feedLink = document.querySelector('.nav-item');

    feedLink.addEventListener("click", (event) => {
        event.preventDefault();

        console.log(event.target);

        if (event.target != document.querySelector('[href="/"]'))
        {
            const userId = +localStorage.getItem("user");

            if (userId) {
                window.location.href = `/index?userid=${userId}`;
            }
            else {
                window.location.href = `/index`;
            }  
        }
    });
});
