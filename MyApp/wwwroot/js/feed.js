'use strict';

import { Apis } from "./Modules/apiRequests";

const apis = new Apis();

document.addEventListener('DOMContentLoaded', () => {

    const feedWrapper = document.getElementById("feed-wrapper");
    const getPostsUrl = '/Home/images?showHidden=false';

    const jumpToStartBtn = document.getElementById('jumpToStartBtn');
    const searchInput = document.getElementById("search-input");

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            jumpToStartBtn.classList.add('visible');
        } else {
            jumpToStartBtn.classList.remove('visible');
        }
    });

    jumpToStartBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    async function onLikeClicked(event)
    {

        event.preventDefault();

        const parent = event.target.parentElement.parentElement;

        const publicationId = +parent.dataset.id;
        console.log("pub id: " + publicationId);

        try {
            console.log("Sending request");
            const response = await fetch(`/Content/like?postId=${publicationId}`, { method: "GET" });

            if (response.ok) {
                const data = await response.json();
                event.target.parentElement.querySelector('span').textContent = data.likes;
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please see console");
        }
    }

    async function getPublisherInfo(userId)
    {
        try {
            const response = await fetch(`/userById?id=${userId}`,
                {
                    method: "GET"
                });


            const result = await response.json();

                  
            return {
                id: result.id,
                login: result.login,
                password: result.password,
                role: result.role
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please see console");
        }
    }

    async function fillFeed(data)
    {
        data.forEach(item => {

            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
           
            postDiv.innerHTML =
                `<div class="post-image-container" data-id="${item.id}">
                <img src="${item.source}" alt="${item.alt}" class="post-image">
                    <div class="username-overlay">${item.username}</div>
                    <div class="like-overlay">
                        <button class="like-icon" id="like"></button>
                        <span>${item.likes}</span>
                    </div>
                </div>
                <div class="post-description">
                    ${item.description}
                </div>`;
            postDiv.querySelector('#like').addEventListener('click', event => onLikeClicked(event));

            feedWrapper.append(postDiv);
        });
    }

    async function refreshFeed()
    {
        try {
            const posts = feedWrapper.querySelectorAll('.post');

            posts.forEach((post) => {
                post.remove();
            });

            const userId = +localStorage.getItem("user");
            
            const response = await fetch(getPostsUrl + `&userid=${userId}`, { method: "GET" });
            const resut = await response.json();

            if (response.ok && resut != null)
            {
                await fillFeed(resut);
            }            
        }
        catch (error) {
            console.log(error);
            alert("An error occured, plase see console log");
        }
    }
    

    async function searchContent(event) {
        if (event != null && event.target != null && event.target.value == null || event.target.value == "") {
            return;
        }

        const data = await apis.searchContent(event.target.value);

        if (data != null)
        {
            const posts = feedWrapper.querySelectorAll('.post');

            posts.forEach((post) => {
                post.remove();
            });

            await fillFeed(data);  
        }

                                    
    }

    searchInput.addEventListener('input', (event) => searchContent(event));

    

    (async function () {
        await refreshFeed();
    }());
});
