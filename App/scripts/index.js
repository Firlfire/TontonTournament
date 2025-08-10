document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("div#global-container #container");

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
                nextStep.Start(stepWinners);
            });
        }
    });

    /**
     * Tournament start
     */
    steps[0].Start(StepDatas.teams);

    // const popup = new PrankPopup("TA MERE", "POUR NAOY");
    // popup.Open();

    GetAllChampionsAndIcons();
});