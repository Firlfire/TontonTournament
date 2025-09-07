document.addEventListener("DOMContentLoaded", function () {
    const teamContainer = document.querySelector(".teams .list");
    const step = new Step();
    DataManager.defaultData.teams.forEach(team => {
        const teamHtml = step.BuildTeamHTML(team);
        teamContainer.appendChild(teamHtml);
    });

    const sectionButtons = document.querySelectorAll(".btn-section");
    sectionButtons.forEach(button => {
        button.addEventListener("click", displaySection);
    });

    const pageButtons = document.querySelectorAll(".btn-url");
    pageButtons.forEach(button => {
        button.addEventListener("click", openPage);
    });
    sectionButtons[0].click();
});

let prankPopup;
function Prank() {
    if (!prankPopup) {
        prankPopup = new PrankPopup([
            {text: "Les devs n'ayant pas été payés, le service s'est arreté de manière... 'impromptue'.", subText: "Merci de payer pour rétablir le service." },
            {text: "RENDS L'ARGENT" },
            {text: "T'as pas le choix... C'est moi le dev", subText: "#hostage" },
        ]);
    }

    return prankPopup.Open();
}
let previousSection = null;
function displaySection(event) {
    Prank();

    if (previousSection) {
        previousSection.style.display = "none";
    }

    const element = event.currentTarget;
    const newSectionId = element.dataset.sectionId;
    const section = document.querySelector(`#${newSectionId}`);
    section.style.display = "block";
    previousSection = section;
}

const openedPages = {};
function openPage(event) {
    if (!Prank()) {
        const element = event.currentTarget;
        const page = element.dataset.pageUrl;
        if (!openedPages[page]) {
            openedPages[page] = window.open(page, element.dataset.pageContext || "_blank");
            // TODO - Fix crash
            // openedPages[page].addEventListener("beforeunload", () => {
            //     delete openedPages[page];
            // });
        }
    }
}