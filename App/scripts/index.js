document.addEventListener("DOMContentLoaded", function () {
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

    const steps = [
        new FusionStep("Round 1"),
        new Step(1, false, "Semi Final", 4),
        new Step(1, true, "Final", 2),
        new Step(1, false, "Winners", 1)
    ];

    steps.forEach((step, index) => {
        const stepHtml = step.BuildHTML();
        container.appendChild(stepHtml);
        const nextStep = steps[index + 1];
        
        if (nextStep) {
            stepHtml.addEventListener("step-end", () => {
                const stepWinners = step.GetWinners();
                console.log("STEP WINNERS");
                console.table(stepWinners);

                stepWinners.forEach(winners => {
                    nextStep.AddWinners(winners);
                });
                nextStep.Start();
            });
        }
    });

    /**
     * Tournament start
     */
    teams.forEach(team => {
        steps[0].AddTeam(team);
    });
    steps[0].Start();

    // const popup = new PrankPopup("TA MERE", "POUR NAOY");
    // popup.Open();

    GetAllChampionsAndIcons();
});