class Step {
    constructor(container, winnerCount, straightConnector, stepLabel) {
        this.container = container;
        this.winnerCount = winnerCount;
        this.straightConnector = straightConnector ?? false;
        this.stepLabel = stepLabel;
    }

    //#region abstract members
    // Return HTMLElement to show
    GetParticipantsHTML() {
        throw "Not Implemented";
    }
    //#endregion abstract members

    AddTeam(team) {
        if (!this.teams) {
            this.teams = [];
        }

        this.teams.push(team);
    }

    BuildMatchHTML(match) {
        const template = document.querySelector("#match-template").content.cloneNode(true);
        const html = template.querySelector(".match");

        if (this.straightConnector)
        {
            html.classList.add("connector-straight");
        }

        const label = html.querySelector(".label");
        label.innerText = match.title;

        html.querySelector(".participants").append(...match.teams.map(team => this.BuildParticipantHTML(team)));
        
        return html;
    }

    BuildTeamHTML(teamData) {
        const template = document.querySelector("#team-template").content.cloneNode(true);
        const html = template.querySelector(".team");
        const name = html.querySelector(".name");
        name.innerText = teamData.name;

        const input = html.querySelector(".score");
        input.addEventListener("change", () => {
            console.log(`Team score change : ${teamData.score} => ${input.value}`);
            teamData.score = input.value;
            const customEvent = this.BuildEvent("scoreChange", { teamData: teamData });
            input.dispatchEvent(customEvent);
        });

        html.querySelector(".members").append(...teamData.members.map(name => {
            const element = document.createElement("span");
            element.innerText = name;
            return element;
        }));

        return html;
    }

    BuildEvent(eventName, data)
    {
        return new CustomEvent(eventName, {
            bubbles: true,
            detail: data,
        });
    }

    GetHTML() {
        this.container.innerHTML = "";

        const label = document.createElement("div");
        label.className = "label";
        label.innerText = this.stepLabel;
        this.container.appendChild(label);

        const matches = this.GetMatches();

        matches.forEach((match) => {
            const matchHtml = this.BuildMatchHTML(match);
            this.container.appendChild(matchHtml);
        });
        
        this.container.addEventListener("scoreChange", teamData => {
            console.log(`Catch Event 'scoreChange', isEnded = ${this.IsStepEnded()}`);
            console.log(`TeamData: ${teamData}`);
            if (this.IsStepEnded()) {
                const winners = this.GetWinners();
                const event = this.BuildEvent("step-end", {winners})
                this.container.dispatchEvent(event);
            }
        });

        return this.container;
    }

    GetMatches() {
        // TODO - Implements for standard match (not fusion)
    }

    GetTeams() {
        return this.teams;
    }

    GetWinners() {
        if (this.IsStepEnded())
        {
            // TODO - handle tie
            return this.teams.sort((team1, team2) => team2.score - team1.score).slice(0, this.winnerCount);
        }
    }

    IsStepEnded() {
        return this.teams.every(team  => !!team.score || team.score === 0);
    }
}

class FusionStep extends Step {
    constructor(stepLabel) {
        const container = document.querySelector(".step#step-1");
        super(container, 4, true, stepLabel);
    }

    //#region abstract members
    BuildParticipantHTML(participants) {
        const template = document.querySelector("#fusion-template").content.cloneNode(true);
        const html = template.querySelector(".fusion-wrapper");

        for (const team of participants) {
            const teamHtml = this.BuildTeamHTML(team);
            html.appendChild(teamHtml);
        }

        return html;
    }
    //#endregion abstract members

    //#region overriden members
    GetMatches() {
        if (!this.matches) {
            const teams = this.GetTeams();

            const matchCount = teams.length / 2;
            this.matches = [];
            
            while (this.matches.length < matchCount) {
                const match = {
                    title: `Fusion ${this.matches.length + 1}`,
                    teams : teams.splice(0, 2)
                };

                this.matches.push(match);
            }
        }

        return this.matches;
    }

    // Replaced by 'GetMatches'
    GetTeams() {
        if (!this.fusionnedTeams) {
            const fusionCount = this.teams.length / 2;
            this.fusionnedTeams = [];

            const duplicateTeams = Array.from(this.teams);
            // const shuffledTeams = Array.from(this.teams).sort( () => Math.random());

            while (this.fusionnedTeams.length < fusionCount) {
                const fusion = [];
                // todo - use ...shuffledTeams.splice(0, 2)
                this.fusionnedTeams.push(fusion);

                while (fusion.length < 2) {
                    const randomTeamIndex = Math.floor(Math.random() * duplicateTeams.length);
                    const [team] = duplicateTeams.splice(randomTeamIndex, 1);
                    fusion.push(team);
                    // const team = shuffledTeams.pop();
                    // match.teams.push(team);
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
