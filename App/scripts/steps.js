const events = {
    Score: "score-change",
    MatchEnd: "match-end",
    StepEnd: "step-end"
}

class Step {
    static totalCount = 0;

    constructor(winnerCount, straightConnector, stepLabel, teamsCount) {
        this.matchWinnerCount = winnerCount ?? 1;
        this.straightConnector = straightConnector ?? false;
        this.stepLabel = stepLabel;
        this.matchLabel = "Round";
        this.teams = new Array(teamsCount).fill({ name: null, members: ["", ""]});
    }

    //#region abstract members
    // Return HTMLElement to show
    GetParticipantsHTML() {
        throw "Not Implemented";
    }
    //#endregion abstract members

    AddTeam(team) {
        const firstEmptySlotIndex = this.teams.findIndex(team => !team.name);
        if (Number.isInteger(firstEmptySlotIndex) && firstEmptySlotIndex > -1) {
            this.teams[firstEmptySlotIndex] = team;
        }
        else {
            throw new Error("All team slot are already occupied");
        }
    }

    AddWinners(winners) {
        winners.forEach(winner => {
            this.AddTeam(winner);
        });
    }

    BuildContainer() {
        if (!this.container)
        {
            this.container = document.createElement("section");
            this.container.classList.add("step");
            this.container.id = `step-${++Step.totalCount}`
        }
        else
        {
            this.container.innerHTML = "";
        }
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
        
        html.addEventListener(events.Score, () => {
            const winners = this.GetMatchWinners(match);
            console.log(`Catch Event <${events.Score}>`);
            if (winners && winners.length)
            {
                console.table(winners);
                // prevent to pass scrore and other data to next step
                match.winners = winners.map(winner => ({ name: winner.name, members: winner.members }));
                const customEvent = this.BuildEvent(events.MatchEnd);
                html.dispatchEvent(customEvent);
            }
        });
        
        return html;
    }

    BuildParticipantHTML(team) {
        return this.BuildTeamHTML(team);
    }

    BuildTeamHTML(teamData) {
        const template = document.querySelector("#team-template").content.cloneNode(true);
        const html = template.querySelector(".team");
        const name = html.querySelector(".name");
        name.innerText = teamData.name || "&nbsp;";

        const input = html.querySelector(".score");
        input.addEventListener("change", () => {
            console.log(`Score change for team '${teamData.name}' : ${teamData.score} => ${input.value}`);
            teamData.score = input.value;
            const customEvent = this.BuildEvent(events.Score, { teamData: teamData });
            input.dispatchEvent(customEvent);
        });

        html.querySelector(".members").append(...teamData.members.map(name => {
            const element = document.createElement("span");
            element.innerText = name || "&nbsp;";
            return element;
        }));

        return html;
    }

    BuildEvent(eventName, data, bubbles)
    {
        return new CustomEvent(eventName, {
            bubbles: bubbles ?? true,
            detail: data,
        });
    }

    BuildHTML() {
        this.BuildContainer();

        const label = document.createElement("div");
        label.className = "label";
        label.innerText = this.stepLabel;
        this.container.appendChild(label);

        this.matches = this.GetMatches();
        this.matches.forEach((match) => {
            const matchHtml = this.BuildMatchHTML(match);
            this.container.appendChild(matchHtml);
        });
        
        if (!this.initialized)
        {
            this.container.addEventListener(events.MatchEnd, teamData => {
                console.log(`Catch Event <${events.MatchEnd}>, isStepEnded = ${this.IsStepEnded()}`);
                console.log(`TeamData: ${JSON.stringify(teamData)}`);
                if (this.IsStepEnded()) {
                    const winners = this.GetWinners();
                    const event = this.BuildEvent(events.StepEnd, {winners})
                    this.container.dispatchEvent(event);
                }
            });
        }

        this.initialized = true;
        return this.container;
    }

    GetMatches() {
        const teams = this.GetTeams();

        const matchCount = teams.length / 2;
        const matches = [];
        
        while (matches.length < matchCount) {
            const match = {
                title: `${this.matchLabel} ${matches.length + 1}`,
                teams : teams.splice(0, 2)
            };

            matches.push(match);
        }

        return matches;
    }

    GetTeams() {
        return Array.from(this.teams);
    }

    GetWinners() {
        if (this.IsStepEnded())
        {
            return this.matches.map(match => match.winners);
        }
    }

    GetMatchWinners(match) {
        // TODO - handle tie
        if (match.teams.every(team => !!team.score)) {
            return match.teams.sort((team1, team2) => team2.score - team1.score).slice(0, this.matchWinnerCount)
        }
        return null;
    }

    IsStepEnded() {
        return this.matches.every(match  => !!match.winners);
    }

    Start() {
        // TODO - Better than rebuild whole HTML;
        this.BuildHTML();
        this.started = true;
        this.container.classList.add("active");
    }
}

class FusionStep extends Step {
    constructor(stepLabel) {
        super(2, true, stepLabel, 8);
        this.matchLabel = "Fusion";
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
    // Replaced by 'GetMatches'
    GetTeams() {
        if (!this.started || (!this.fusionnedTeams && this.teams)) {
            const fusionCount = this.teams.length / 2;
            this.fusionnedTeams = [];

            const duplicateTeams = super.GetTeams();
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

        return this.fusionnedTeams || [];
    }

    GetMatchWinners(match) {
        return super.GetMatchWinners({
            teams: match.teams.flat()
        });
    }
    //#endregion overriden members

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
