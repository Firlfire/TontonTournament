class Popup {
    constructor(title, message) {
        this.title = title;
        this.message = message;
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
        this.body.innerText = this.message;
        this.container.appendChild(this.body);

        this._FillContent();
    }

    _FillContent() {
        throw new Error("Not implemented");
    }

    Open() {
        this.#BuildHTML();
        this.container.show();
    }

    Close() {
        this.container.close();
    }
}

class PrankPopup extends Popup {
    _FillContent() {
    }
}