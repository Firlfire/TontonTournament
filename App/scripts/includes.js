// Fonction pour inclure un fragment HTML
function insertTemplate(templateId, targetElementId) {
    const template = document.getElementById(templateId);
    const clone = document.importNode(template.content, true); // Clone le contenu du template
    const targetElement = document.getElementById(targetElementId);
    targetElement.appendChild(clone); // Ajoute le clone dans l'élément cible
}

// Appels d'inclusion
document.addEventListener("DOMContentLoaded", () => {
    // insertTemplate("headerTemplate", "header");
    // insertTemplate("footerTemplate", "footer");
});