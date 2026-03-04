'use strict';

document.addEventListener('DOMContentLoaded', () => {

    let urlInput = document.getElementById("urlInput");
    let parseBtn = document.getElementById("submitParse");


    parseBtn.addEventListener("click", (event) =>
    {
        event.preventDefault();
        let result = [];
        const url = urlInput.value.trim();
        if (!url)
        {
            alert("Please enter a URL");
        }

        try {

            let figures = document.getElementsByTagName("figure");

            Array.from(figures).forEach(p => {
                result.push({
                    link: p.getElementsByClassName("image")[0],
                    imagePreviewLink: p.getElementsByTagName("img")[0].src
                });
            });
            console.log(result);
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please check console log");
        }
    });
});