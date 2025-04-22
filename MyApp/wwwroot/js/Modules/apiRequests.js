import { constants } from "../Modules/constants";

export class Apis{
    
    constructor()
    {
        this.baseUrl = constants.baseUrl;
        this.loginUrl = '/Home/userLogin';
        this.searchUrl = constants.serachUrl;
        this.getAllContent = constants.allContent;
    }

    async login(login, password)
    {
        try {
            const response = await fetch(this.loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login: login, password: password })
            });

            const result = await response.json();

            if (response.ok && result.success === true)
            {
                return { userId: result.userId, token: result.token };
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please check console output");
            return { userId: null, token: null };
        }
    }

    async searchContent(keyword)
    {
        try {
            const response = await fetch(`${this.searchUrl}${keyword}`,
                {
                    method: "POST",
                    body: JSON.stringify({ keyword: keyword ?? ' ' })
                });

            const result = await response.json();

            if (response.ok && result != null)
            {
                return result;
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please see console output");
        }

        return [];
    }

    async getAllContent(withBlocked)
    {
        console.log(`${getAllContent}${withBlocked}`);
        try {
            //const response = await fetch(`${getAllContent}${withBlocked}`, { method: "GET" });
            const response = await fetch("/Home/images?showHidden=false", { method: "GET" });
            const resut = await response.json();

            if (response.ok && resut != null)
            {
                return resut;
            }
        }
        catch (error)
        {
            console.log(error);
            alert("An error occured, please see console output");
        }

    }
    
}

export let apis = new Apis();