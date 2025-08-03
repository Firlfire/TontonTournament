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

    // const steps = [
    //     new FusionStep(),
    // ];

    // for (const step of steps) {
    //     const html = step.GetHTML();
    //     container.appendChild(html);
    // }

    const fusionStep = new FusionStep("Round 1");
    const semiFinal = new Step(1, false, "Semi Final", 4);
    const final = new Step(1, true, "Final", 2);
    const Winners = new Step(1, false, "Semi Final 2", 1);

    const fusionStepHtml = fusionStep.BuildHTML();
    container.appendChild(fusionStepHtml);
    fusionStepHtml.addEventListener("step-end", () => {
        const stepWinners = fusionStep.GetWinners();
        console.log("STEP WINNERS");
        console.table(stepWinners);
        stepWinners.forEach(winners => {
            semiFinal.AddWinners(winners);
        });
        semiFinal.Start();
    });

    const semiFinalHtml = semiFinal.BuildHTML();
    container.appendChild(semiFinalHtml);
    semiFinalHtml.addEventListener("step-end", () => {
        const stepWinners = semiFinal.GetWinners();
        console.log("STEP WINNERS");
        console.table(stepWinners);
        stepWinners.forEach(winners => {
            final.AddWinners(winners);
        });
        final.Start();
    });

    const finalHtml = final.BuildHTML();
    container.appendChild(finalHtml);
    finalHtml.addEventListener("step-end", () => {
        const stepWinners = final.GetWinners();
        console.log("STEP WINNERS");
        console.table(stepWinners);
        stepWinners.forEach(winners => {
            Winners.AddWinners(winners);
        });
        Winners.Start();
    });

    // TODO - Remove container style for winner
    const winnerHtml = Winners.BuildHTML();
    container.appendChild(winnerHtml);

    /**
     * Tournament start
     */
    teams.forEach(team => {
        fusionStep.AddTeam(team);
    });
    fusionStep.Start();

    // const popup = new PrankPopup("TA MERE", "POUR NAOY");
    // popup.Open();

    GetAllChampionsAndIcons();
});