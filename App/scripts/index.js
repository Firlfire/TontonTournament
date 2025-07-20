document.addEventListener("DOMContentLoaded", function() { 
    const container = document.querySelector("div#GlobalContainer #container");

    const steps = [
        new FusionStep(),
        // new QuarterStep(),
        // new DemiStep(),
        // new FinalStep(),
    ];

    for (const step of steps) {
        // const lines = step.GetLines();
        // if (lines)
        // {
        //     container.appendChild(html);
        // }
        
        const html = step.GetHTML();
        container.appendChild(html);
        
        // const connectors = step.GetConnectors();
        // if (connectors)
        // {
        //     container.appendChild(connectors);
        // }
    }

    const fusionStep = new FusionStep();
    const html = fusionStep.GetHTML();
    container.insertBefore(html, container.firstChild);
});