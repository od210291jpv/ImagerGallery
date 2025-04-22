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

                window.location.href = result.redirectUrl || '/index';
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please check console log");
        }
    });
});