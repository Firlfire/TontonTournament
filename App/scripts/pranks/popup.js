class Popup {
    constructor(title) {
        this.title = title;
    }

    static GetContainer() {
        const globalContainer = document.querySelector("body");
        let popupContainer = globalContainer.querySelector("#popup-container");
        if (!popupContainer) {
            popupContainer = document.createElement("dialog");
            popupContainer.id = "popup-container";
            globalContainer.appendChild(popupContainer);
        }

        popupContainer.innerHTML = "";
        return popupContainer;
    }

    #BuildHTML() {
        this.container = Popup.GetContainer();
        
        this.header = document.createElement("div");
        this.header.id = "header";
        this.header.innerText = this.title;
        this.container.appendChild(this.header);

        this.body = document.createElement("div");
        this.body.id = "body";

        this._FillContent();
    }

    _FillContent() {
        throw new Error("Not implemented");
    }

    Open() {
        this.#BuildHTML();
        this.container.classList.add("show");
    }

    Close() {
        this.container.classList.remove("show");
    }
}

class PrankPopup extends Popup {
    constructor(message, title) {
        super(title);
        this.message = message;
    }

    _FillContent() {
        const content = document.createElement("div");
        content.innerText = this.message;
    }
}