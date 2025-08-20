const events = {
    Score: "score-change",
    MatchEnd: "match-end",
    StepEnd: "step-end"
}

class DataManager {
    static #keyPrefix = "KillSecureCompetition";
    static defaultData = {
        teams: [
            { id: 1, name: "Les pires...", members: ["Tonton NaoyTV", "Tonton W31lon"] },
            { id: 2, name: "Les devs", members: ["Tonton Dodger", "Tonton SeinQ"] },
            { id: 3, name: "Les joueurs de Valoran", members: ["Tonton Thirty", "Tonton Wick"] },
            { id: 4, name: "Les Random", members: ["CHOKO LA RANDOM", "UN AUTRE RANDOM"] },
            { id: 5, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
            { id: 6, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
            { id: 7, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
            { id: 8, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
        ]
    };

    #storageKey = "KillSecureCompetition";

    constructor(key) {
        this.#storageKey = `${DataManager.#keyPrefix}-${key}`;
        this.#LoadData();
    }

    #LoadData() {
        const dataStr = localStorage.getItem(this.#storageKey);
        this.data = dataStr ? JSON.parse(dataStr) : {};
    }

    CleanData() {
        localStorage.removeItem(this.#storageKey);
    }
    
    GetData() {
        if (!this.data) {
            this.data = this.#LoadData();
        }
    }

    SaveData(newData) {
        console.log(`Update LocalStorage ${this.key} data => ${JSON.stringify(newData)}`);
        localStorage.setItem(this.#storageKey, JSON.stringify(newData));
        this.#LoadData();
    }
}

class HtmlBuilder {
    static GetStep() {
        if (!HtmlBuilder.step)
        {
            HtmlBuilder.step = document.createElement("section");
            HtmlBuilder.step.className = "step";
         
            const label = document.createElement("div");
            label.className = "label title";
            HtmlBuilder.step.appendChild(label);
        }

        return HtmlBuilder.step.cloneNode(true);
    }

    static GetMatch() {
        if (!HtmlBuilder.match)
        {
            HtmlBuilder.match = document.createElement("div");
            HtmlBuilder.match.className = "match";
         
            const label = document.createElement("div");
            label.className = "label title";
            HtmlBuilder.match.appendChild(label);
         
            const participants = document.createElement("div");
            participants.className = "participants";
            HtmlBuilder.match.appendChild(participants);
        }

        return HtmlBuilder.match.cloneNode(true);
    }

    static GetTeam() {
        if (!HtmlBuilder.team)
        {
            HtmlBuilder.team = document.createElement("div");
            HtmlBuilder.team.className = "team";

            const name = document.createElement("h3");
            name.className = "name";
            HtmlBuilder.team.appendChild(name);

            const members = document.createElement("div");
            members.className = "members";
            HtmlBuilder.team.appendChild(members);

            const stats = document.createElement("div");
            stats.className = "stats";
            HtmlBuilder.team.appendChild(stats);

            const label = document.createElement("label");
            label.for = "score";
            label.innerText = "Points"
            stats.appendChild(label);

            const score = document.createElement("input");
            score.className = "score";
            score.type = "text";
            stats.appendChild(score);
        }

        return HtmlBuilder.team.cloneNode(true);
    }
}

// TODO - Register/Load tournament data in LocalStorage
class Step {
    static #totalCount = 0;

    constructor(winnerCount, straightConnector, stepLabel, teamsCount) {
        this.matchWinnerCount = winnerCount ?? 1;
        this.straightConnector = straightConnector ?? false;
        this.stepLabel = stepLabel;
        this.matchLabel = "Match"; // ou Demi-Final ou Final ?
        this.teamSize = teamsCount;
        this.id = Step.#totalCount++;
        this.localStorage = new DataManager(`step-${this.id}`);
    }

    // AddTeam(team) {
    //     // TODO - Refacto intialization : without fake data
    //     const firstEmptySlotIndex = this.teams.findIndex(team => !team.name);
    //     if (Number.isInteger(firstEmptySlotIndex) && firstEmptySlotIndex > -1) {
    //         this.teams[firstEmptySlotIndex] = team;
    //     }
    //     else {
    //         throw new Error("All team slot are already occupied");
    //     }
    // }

    BuildContainer() {
        if (!this.container)
        {
            this.container = HtmlBuilder.GetStep(this.id);
            const label = this.container.querySelector(".label");
            label.innerText = this.stepLabel;
        }
        else
        {
            // TODO - Better way to Reset match data without Rebuild whole dom
            this.container.replaceChildren(this.container.firstChild);
        }
    }

    BuildMatchHTML(match) {
        const html = HtmlBuilder.GetMatch();

        if (this.straightConnector)
        {
            html.classList.add("connector-straight");
        }

        const label = html.querySelector(".label");
        label.innerText = match.title;

        html.querySelector(".participants").append(...match.teams.map(team => this.BuildTeamHTML(team)));
        
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

    BuildTeamHTML(teamData) {
        const html = HtmlBuilder.GetTeam();
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

        this.matches = this.GetMatches();
        this.matches.forEach((match) => {
            const matchHtml = this.BuildMatchHTML(match);
            this.container.appendChild(matchHtml);
        });
        
        if (!this.initialized)
        {
            this.container.addEventListener(events.MatchEnd, this.OnMatchEnd.bind(this));
        }

        this.initialized = true;
        return this.container;
    }

    // TODO - Randomize participants
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

    //!!\\ Refacto en cours !
    GetTeams() {

        if (!this.teams)
        {
            // TODO - Refacto intialization : without fake data - no need if step display one after one
            return new Array(this.teamSize).fill({ name: null, members: ["", ""]});
        }

        return Array.from(this.teams);
    }

    GetWinners() {
        if (this.IsStepEnded())
        {
            return this.matches.map(match => match.winners).flat();
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

    OnMatchEnd() {
        const isStepEnded = this.IsStepEnded();
        console.log(`Catch Event <${events.MatchEnd}>, isStepEnded = ${isStepEnded}`);
        
        if (this.IsStepEnded()) {
            const winners = this.GetWinners();
            this.localStorage.SaveData({
                matches: this.matches
            });
            
            const event = this.BuildEvent(events.StepEnd, {winners});
            this.container.dispatchEvent(event);
        }
        else {
            console.log("Step is not ended !");
        }
    }

    Start(teams) {
        const log = `Start Step <${this.stepLabel}>`
        console.groupCollapsed(log);
        console.table(teams);

        if (!teams || teams.length !== this.teamSize) {
            throw new Error("The provided team list must match the team count required for this step");
        }

        // TODO - Refacto initialization : without fake data
        this.teams = teams;
        // teams.forEach(team => {
        //     this.AddTeam(team);
        // });

        // TODO - Better than rebuild whole HTML;
        this.BuildHTML();
        this.started = true;
        this.container.classList.add("active");
        console.groupEnd();
    }
}

class FusionStep extends Step {
    constructor(stepLabel) {
        super(2, true, stepLabel, 8);
        this.matchLabel = "Fusion";
    }

    //#region abstract members
    BuildTeamHTML(team) {
        const html = document.createElement("div")
        html.className = "fusion-wrapper";

        for (const duo of team) {
            const teamHtml = super.BuildTeamHTML(duo);
            html.appendChild(teamHtml);
        }

        return html;
    }
    //#endregion abstract members

    //#region overriden members
    // Replaced by 'GetMatches'
    GetTeams() {
        if (!this.started || (!this.fusionnedTeams && this.teams)) {
            const fusionCount = this.teamSize / 2;
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
}
