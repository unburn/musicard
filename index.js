const fetch = require("node-fetch");

class Musicard {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.base = "https://api.unburn.tech/musicard";
        this.headers = {
            'Unburn-Key': this.apiKey,
            'Content-Type': 'application/json'
        }
    }

    async sendRequest(endpoint, method, body) {
        return new Promise((resolve, reject) => {
            const options = {
                method: method,
                headers: this.headers,
                body: JSON.stringify(body)
            };

            fetch(`${this.base}${endpoint}`, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                })
        })
    }

    async classic(params) {
        const body = {
            thumbnailImage: params.thumbnailImage,
            backgroundColor: params.backgroundColor,
            progress: params.progress,
            progressColor: params.progressColor,
            progressBarColor: params.progressBarColor,
            name: params.name,
            nameColor: params.nameColor,
            author: params.author,
            authorColor: params.authorColor,
            startTime: params.startTime,
            endTime: params.endTime
        }

        return this.sendRequest("/classic", "POST", body);
    }

    async vibrant(params) {
        const body = {
            thumbnailImage: params.thumbnailImage,
            backgroundColor: params.backgroundColor,
            menuColor: params.menuColor,
            progress: params.progress,
            progressColor: params.progressColor,
            progressBarColor: params.progressBarColor,
            paused: params.paused
        }

        return this.sendRequest("/vibrant", "POST", body);
    }
}

module.exports = { Musicard };