document.addEventListener("DOMContentLoaded", function () {
    const teamContainer = document.querySelector(".teams .list");
    const step = new Step();
    StepDatas.teams.forEach(team => {
        const teamHtml = step.BuildTeamHTML(team);
        teamContainer.appendChild(teamHtml);
    });
});