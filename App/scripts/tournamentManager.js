class Step {
    constructor() {
        this.teams = [
            { name: "Les pires...", members: ["Tonton NaoyTV", "Tonton W31lon"] },
            { name: "Les devs", members: ["Tonton Dodger", "Tonton SeinQ"] },
            { name: "Les antagonistes", members: ["Tonton Thirty", "Tonton Wick"] },
            { name: "Les Random", members: ["CHOKO LA RANDOM", "UN AUTRE RANDOM"] },
            { name: "D'autre randoms", members: ["Random 1", "Random 2"] },
            { name: "D'autre randoms", members: ["Random 1", "Random 2"] },
            { name: "D'autre randoms", members: ["Random 1", "Random 2"] },
            { name: "D'autre randoms", members: ["Random 1", "Random 2"] },
        ];
    }

    //#region abstract members
    GetWinners() {
        throw "Not Implemented";
    }

    // Return HTMLElement to show
    GetLines() {
        throw "Not Implemented";
    }

    GetHTML() {
        throw "Not Implemented";
    }

    GetConnectors() {
        throw "Not Implemented";
    }
    //#endregion abstract members

    AddTeam(team) {
        if (!this.teams) {
            this.teams = [];
        }

        this.teams.push(team);
    }

    GetTeams() {
        return this.teams;
    }

    BuildTeamHTML(teamData) {
        const template = document.querySelector("#team-template").content.cloneNode(true);
        const html = template.querySelector(".team");
        const name = html.querySelector(".name");
        name.innerText = teamData.name;

        html.querySelector(".members").append(...teamData.members.map(name => {
            const element = document.createElement("span");
            element.innerText = name;
            return element;
        }));

        return html;
    }
}

class FusionStep extends Step {
    constructor(teams) {
        super();
        this.fusionnedTeams = teams;
    }

    //#region abstract members
    GetHTML() {
        const container = document.querySelector(".team-list#step-1");
        container.innerHTML = "";
        const fusions = this.GetTeams();

        fusions.forEach((teams) => {
            const fusionWrapper = this.BuildFusionHTML(teams);
            container.appendChild(fusionWrapper);
        });

        return container;
    }
    //#endregion abstract members

    //#region overriden members
    GetTeams() {
        if (!this.fusionnedTeams) {
            const fusionCount = this.teams.length / 2;
            this.fusionnedTeams = [];

            const duplicateTeams = Array.from(this.teams);

            while (this.fusionnedTeams.length < fusionCount) {
                const fusion = [];
                this.fusionnedTeams.push(fusion);

                while (fusion.length < 2) {
                    const randomTeamIndex = Math.floor(Math.random() * duplicateTeams.length);
                    const [team] = duplicateTeams.splice(randomTeamIndex, 1);
                    fusion.push(team);
                }
                console.warn("NOT CHANGE", this.teams);
            }
        }

        return this.fusionnedTeams;
    }
    //#endregion abstract members

    BuildFusionHTML(teams) {
        const template = document.querySelector("#fusion-template").content.cloneNode(true);
        const html = template.querySelector(".fusion-wrapper");

        for (const team of teams) {
            const teamHtml = this.BuildTeamHTML(team);
            html.appendChild(teamHtml);
        }

        return html;
    }
}

class MatchStep extends Step {
    constructor(teams) {
        super();
        this.fusionnedTeams = teams;
    }

    //#region abstract members
    GetHTML() {
        const container = document.querySelector(".team-list#step-1");
        container.innerHTML = "";
        const fusions = this.GetTeams();

        fusions.forEach((teams) => {
            const fusionWrapper = this.BuildFusionHTML(teams);
            container.appendChild(fusionWrapper);
        });

        return container;
    }
    //#endregion abstract members

    //#region overriden members
    GetTeams() {
        if (!this.fusionnedTeams) {
            const fusionCount = this.teams.length / 2;
            this.fusionnedTeams = [];

            const duplicateTeams = Array.from(this.teams);

            while (this.fusionnedTeams.length < fusionCount) {
                const fusion = [];
                this.fusionnedTeams.push(fusion);

                while (fusion.length < 2) {
                    const randomTeamIndex = Math.floor(Math.random() * duplicateTeams.length);
                    const [team] = duplicateTeams.splice(randomTeamIndex, 1);
                    fusion.push(team);
                }
                console.warn("NOT CHANGE", this.teams);
            }
        }

        return this.fusionnedTeams;
    }
    //#endregion abstract members

    BuildFusionHTML(teams) {
        const template = document.querySelector("#fusion-template").content.cloneNode(true);
        const html = template.querySelector(".fusion-wrapper");

        for (const team of teams) {
            const teamHtml = this.BuildTeamHTML(team);
            html.appendChild(teamHtml);
        }

        return html;
    }
}