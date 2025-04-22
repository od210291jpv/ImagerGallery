//'use strict';


//document.addEventListener("DOMContentLoaded", () =>
//{
//    let wrapper = document.getElementById('wrapper');

//    function createimageElement(src)
//    {
//        let element = document.createElement('img');
//        element.src = "/img/" + src;
//        element.setAttribute('data-image', 1);
//        element.classList.add('imgContent');
//        return element;
//    }

//    function refreshImagesFeed(selector, newImages)
//    {
//        const allimages = document.querySelectorAll(selector);
//        allimages.forEach((item) =>
//        {
//            item.remove();
//        });
//        console.log(typeof (newImages));        
//        newImages.Content.forEach((item) =>
//        {
//            let img = createimageElement(item);
//            wrapper.append(img);
//        });
//    }

//    const searchInput = document.getElementById("search-input");

//    async function searchContent(event)
//    {
//        if (event != null && event.target != null && event.target.value == null || event.target.value == "")
//        {
//            return;
//        }

//        await fetch("http://192.168.88.33:5198/Home/search?keyword=" + event.target.value,
//            {
//                method: "POST",
//                body: JSON.stringify({ keyword: event.target.value ?? ' ' })
//            })
//            .then(response => (response.json()))
//            .then(json => {
//                refreshImagesFeed('.imgContent', json);

//                const images = document.querySelectorAll('.imgContent');

                
//            });
//    }
    
//    searchInput.addEventListener('input', (event) => searchContent(event));

//    const images = document.querySelectorAll('.imgContent');

//    function onHover(e)
//    {
//        if (e.target && e.target.tagName == "IMG")
//        {
//            e.target.style.width = '850px';
//        }
//    }

//    function onLeave(e)
//    {
//        if (e.target && e.target.tagName == "IMG") {
//            e.target.style.width = '800px';
//        }
//    }

//    function onCLick(e)
//    {
//        if (e.target && e.target.tagName == "IMG") {
//            e.target.style.width = '1200px';
//        }
//    }

//    wrapper.addEventListener("mouseover", onHover);
//    wrapper.addEventListener("mouseout", onLeave);
//    wrapper.addEventListener("click", onCLick);
//});






