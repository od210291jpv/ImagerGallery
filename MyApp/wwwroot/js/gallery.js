'use strict';
import { Apis } from "./Modules/apiRequests";

const apis = new Apis();

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery');
    const paginationContainer = document.getElementById('pagination');
    let searchInput = document.getElementById("search-input");

    const imagesPerPage = 12; 

    class ImagePost
    {
        constructor(url, description, alt)
        {
            this.url = url;
            this.description = description;
            this.alt = alt;
        }
    }

    async function getAllContent()
    {
        let response = await axios.get("http://192.168.88.33:5198/Home/images?showHidden=true");
        let count = 0;
        return response.data.map((i) =>
        {
            count++;
            return new ImagePost(i.source, i.description, i.alt);
        });
    }

    (async () => {

        let allImages = await getAllContent();

        function refreshImagesFeed(newImages) {
            allImages = [];
            console.log(newImages);
            allImages = newImages.map((item) => {
                return new ImagePost(item.source, item.description, item.alt);
            });

            displayImages(currentPage);
        }
        
        async function searchContent(event) {
            if (event != null && event.target != null && event.target.value == null || event.target.value == "") {
                return;
            }

            const data = await apis.searchContent(event.target.value);
            refreshImagesFeed(data);
        }

        let currentPage = 1;
        const totalPages = Math.ceil(allImages.length / imagesPerPage);

        function displayImages(page) {
            galleryContainer.innerHTML = '';
            currentPage = page;

            const startIndex = (page - 1) * imagesPerPage;
            const endIndex = startIndex + imagesPerPage;

            const itemsToShow = allImages.slice(startIndex, endIndex);

            itemsToShow.forEach((itemData) => {
              
                const galleryItem = document.createElement('figure');
                galleryItem.classList.add('gallery-item'); 


                const img = document.createElement('img');
                img.src = itemData.url;

                img.alt = itemData.alt || itemData.description;
                img.loading = 'lazy';


                const figcaption = document.createElement('figcaption');
                figcaption.classList.add('image-description'); 
                figcaption.textContent = itemData.description;

                galleryItem.appendChild(img);
                galleryItem.appendChild(figcaption);
                galleryItem.addEventListener("click", (event) =>
                {
                    event.target.parentElement.classList.toggle("zoom-in");
                });


                galleryContainer.appendChild(galleryItem);
            });

            updatePaginationButtons();
        }

        function setupPagination() {
            paginationContainer.style.padding = "15px";
            paginationContainer.innerHTML = '';

            const prevButton = document.createElement('button');
            prevButton.classList.add('page-btn', 'prev-btn');
            prevButton.textContent = '<';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    displayImages(currentPage - 1);
                }
            });
            paginationContainer.appendChild(prevButton);

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.classList.add('page-btn', 'page-number');
                pageButton.textContent = i;
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.addEventListener('click', () => {
                    displayImages(i);
                });
                paginationContainer.appendChild(pageButton);
            }

            const nextButton = document.createElement('button');
            nextButton.classList.add('page-btn', 'next-btn');
            nextButton.textContent = '>';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    displayImages(currentPage + 1);
                }
            });
            paginationContainer.appendChild(nextButton);
        }

        function updatePaginationButtons() {
            const pageButtons = paginationContainer.querySelectorAll('.page-number');
            const prevButton = paginationContainer.querySelector('.prev-btn');
            const nextButton = paginationContainer.querySelector('.next-btn');

            if (prevButton) prevButton.disabled = currentPage === 1;
            if (nextButton) nextButton.disabled = currentPage === totalPages;

            pageButtons.forEach(button => {
                if (parseInt(button.textContent) === currentPage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        }
        
        searchInput?.addEventListener("input", (event) => searchContent(event));

        if (allImages.length > 0) {
            displayImages(currentPage);
            if (totalPages > 1) {
                setupPagination();
            }
        } else {
            galleryContainer.innerHTML = '<p>Нет изображений для отображения.</p>';
        }
    })();
});