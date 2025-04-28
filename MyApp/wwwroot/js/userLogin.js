"use strict";

import { Apis } from "./Modules/apiRequests";

const apis = new Apis();

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginForm");
    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", async (event) =>
    {
        event.preventDefault();

        try {
            const result = await apis.login(loginInput.value, passwordInput.value);

            if (result.userId != null)
            {
                loginForm.reset();
                localStorage.setItem(result.userId, result.token);
                localStorage.setItem("user", result.userId);
                console.log("initial request passed " + result.userId);
                const loginResult = await fetch(`home/default?userid=${result.userId}`, {
                    method: "GET", headers: {
                        "authToken" : result.token
                    }
                });
                console.log(loginResult)
                window.location.href = result.redirectUrl || `/index?userid=${result.userId}`;                
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please check console log");
        }
    });
});