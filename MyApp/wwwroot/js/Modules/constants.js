export class Constants {
    constructor() {};

    #baseUrl = "http://192.168.88.33:5198";
    #searchurl = "/Home/search?keyword=";
    #getallContent = "/Home/images?showHidden=";

    get baseUrl() {
        return this.#baseUrl;
    }

    get serachUrl()
    {
        return this.#searchurl;
    }

    get allContent()
    {
        return this.#getallContent;
    }
    
}

export const constants = new Constants();