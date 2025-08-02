document.addEventListener("DOMContentLoaded", function() { 
    const container = document.querySelector("div#GlobalContainer #container");

    const teams = [
        { id: 1, name: "Les pires...", members: ["Tonton NaoyTV", "Tonton W31lon"] },
        { id: 2, name: "Les devs", members: ["Tonton Dodger", "Tonton SeinQ"] },
        { id: 3, name: "Les antagonistes", members: ["Tonton Thirty", "Tonton Wick"] },
        { id: 4, name: "Les Random", members: ["CHOKO LA RANDOM", "UN AUTRE RANDOM"] },
        { id: 5, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
        { id: 6, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
        { id: 7, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
        { id: 8, name: "D'autre randoms", members: ["Random 1", "Random 2"] },
    ];

    // const steps = [
    //     new FusionStep(),
    // ];

    // for (const step of steps) {
    //     const html = step.GetHTML();
    //     container.appendChild(html);
    // }

    const fusionStep = new FusionStep("Round 1");
    teams.forEach(team => {
        fusionStep.AddTeam(team)
    });

    const fusionHtml = fusionStep.GetHTML();
    fusionHtml.addEventListener("step-end", () => {
        const stepWinners = fusionStep.GetWinners();
        console.table(stepWinners);
    });

    // const popup = new PrankPopup("TA MERE", "POUR NAOY");
    // popup.Open();
});