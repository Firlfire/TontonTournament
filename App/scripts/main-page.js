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

let previousSection = null;
function displaySection(event) {
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
    const element = event.currentTarget;
    const page = element.dataset.pageUrl;
    if (!openedPages[page]) {
        openedPages[page] = window.open(page, element.dataset.pageContext || "_blank");
        openedPages[page].addEventListener("beforeunload", () => {
            delete openedPages[page];
        });
    }
}