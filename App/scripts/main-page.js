document.addEventListener("DOMContentLoaded", function () {
    const teamContainer = document.querySelector(".teams .list");
    const step = new Step();
    StepData.teams.forEach(team => {
        const teamHtml = step.BuildTeamHTML(team);
        teamContainer.appendChild(teamHtml);
    });

    startPage();


    const btnRules = document.querySelector(".btn-rules");
    const btnProgress = document.querySelector(".btn-progress");
    const btnTeams = document.querySelector(".btn-teams");
    const btnRewards = document.querySelector(".btn-rewards");
    const btnBracket = document.querySelector(".btn-bracket");

    btnRules.addEventListener("click", (event) => {
        startPage();
    })

    btnProgress.addEventListener("click", (event) => {
        hideAllSections();
        const progress = document.querySelector("section#steps");
        displayCurrentSection(progress);
    })

    btnTeams.addEventListener("click", (event) => {
        hideAllSections();
        const teams = document.querySelector("section#teams");
        displayCurrentSection(teams);
    })

    btnRewards.addEventListener("click", (event) => {
        hideAllSections();
        const rewards = document.querySelector("section#rewards");
        displayCurrentSection(rewards);
    })

    btnBracket.addEventListener("click", () => {
        window.location.href = "./bracket.html";
    })

});

function hideAllSections() {
    const sectionRules = document.querySelector("#rules");
    const sectionProgress = document.querySelector("#steps");
    const sectionTeams = document.querySelector("#teams");
    const sectionRewards = document.querySelector("#rewards");

    sectionRules.style.display = "none";
    sectionProgress.style.display = "none";
    sectionTeams.style.display = "none";
    sectionRewards.style.display = "none";
}

function displayCurrentSection(item) {
    item.style.display = "block";
}

function startPage() {
    hideAllSections();
    const rules = document.querySelector("section#rules");
    displayCurrentSection(rules);
}