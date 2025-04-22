document.addEventListener("DOMContentLoaded", () => {
    
    const loginInput = document.getElementById("registerLogin");
    const passwordinput = document.getElementById("registerPassword");
    const repeatPasswordInput = document.getElementById("repeatPassword");
    const loginError = document.getElementById("loginError");
    const passwordError = document.getElementById("repeatPasswordError");

    const regForm = document.getElementById("registrationForm");

    console.log(regForm);

    function hideErrors()
    {
        loginError.style.display = "none";
        loginError.style.display = "none";
    }

    async function registerUser(login, password, repeatPassword)
    {
        hideErrors();
        if (login.length < 6)
        {
            loginError.style.display = "block";
            return;
        }

        if (password != repeatPassword)
        {
            passwordError.style.display = "block";
            return;
        }

        try {
            const response = await fetch(regForm.action, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Login: loginInput.value,
                    Password: passwordinput.value,
                    Role: 0
                })
            });

            const result = await response.json();

            if (response.ok) {
                regForm.reset();
                localStorage.setItem(result.userId, result.token);
                window.location.href = result.redirectUrl || '/login';
            }
            else {
                loginError.style.display = "block";
            }
        }
        catch (error) {
            console.log(error);
            alert("An error occured, please see console for details");
        }
    }

    regForm.addEventListener("submit", async (event) =>
    {
        event.preventDefault();
        registerUser(loginInput.value, passwordinput.value, repeatPasswordInput.value);
    })
});