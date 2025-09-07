const prankOption = {
    enablingDate: new Date("09/13/2025 18:05"),
    lsKey: "KillSecureCompetition-Pranked"
}

function ArePrankEnable() {
    const devEnv = window.location.href.toLocaleLowerCase().includes("dev");
    const enable = new Date() >= prankOption.enablingDate;
    return devEnv && enable;
}

class Popup {
    constructor(title, message) {
        this.title = title;
        this.message = message;
        this.contentContainer = document.querySelector("#global-container");
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

    #BuildBody() {
        this.body = document.createElement("div");
        this.body.id = "popup-body";
        this.container.appendChild(this.body);
        
        this.messageElement = document.createElement("p");
        this.messageElement.innerText = this.message;
        this.body.appendChild(this.messageElement);
    }

    #BuildFooter() {
        this.footer = document.createElement("div");
        this.footer.id = "popup-footer";
        this.container.appendChild(this.footer);

        this.validateButton = document.createElement("button");
        this.validateButton.id = "popup-button-validate";
        this.validateButton.innerText = "OK";
        this.validateButton.addEventListener("click", this.Validate.bind(this));
        this.footer.appendChild(this.validateButton);
        
        this.cancelButton = document.createElement("button");
        this.cancelButton.id = "popup-button-cancel";
        this.cancelButton.innerText = "Cancel";
        this.cancelButton.addEventListener("click", this.Close.bind(this));
        this.footer.appendChild(this.cancelButton);
    }

    #BuildHTML() {
        this.container = Popup.GetContainer();

        this.#BuildHeaderHTML();
        this.#BuildBody();
        this.#BuildFooter();

        this._Customize();
    }

    #BuildHeaderHTML() {
        this.header = document.createElement("div");
        this.header.id = "popup-header";

        this.titleElement = document.createElement("h4");
        this.titleElement.innerText = this.title;
        this.header.appendChild(this.titleElement);

        this.container.appendChild(this.header);
    }

    _Customize() {
        throw new Error("Not implemented");
    }

    Center() {
        // TODO - Get width/height before display
        const topPosition = (window.innerHeight - this.container.scrollHeight) / 2;
        const leftPosition = (window.innerWidth - this.container.scrollWidth) / 2;

        this.container.style.top = `${topPosition}px`;
        this.container.style.left = `${leftPosition}px`;
    }

    Close() {
        this.container.close();
        this.contentContainer.classList.remove("hidden");
    }

    Open() {
        this.#BuildHTML();
        // this.Center();
        this.container.show();
        this.contentContainer.classList.add("hidden");
        return true;
    }

    SetIcon(icon) {
        if (icon) {
            if (!this.icon) {
                this.icon = document.createElement("img");
                this.icon.className = "icon";
                this.header.appendChild(this.icon);
            }
            
            this.icon.setAttribute("src", icon);
            this.icon.classList.remove("hidden");
        }
        else if (this.icon) {
            this.icon.classList.add("hidden");
        }
    }

    Validate() {
        this.Close();
    }
}

class PrankPopup extends Popup {
    constructor(messageList) {
        super("Le service a cessé de fonctionner");

        this.currentMessageIndex = -1;
        this.messages = messageList;
    }

    _Customize() {
        this.SetIcon("./assets/troll.png");
        this.container.classList.add("prank");
        
        this.cancelButton.innerText = "JAMA1 !";
        this.validateButton.innerText = "Je m'engage !";
        
        this.subTextElement = document.createElement("p");
        this.body.appendChild(this.subTextElement);
        
        const MoveOnEnter = () => {
            this.Move();
            this.footer.removeEventListener("mouseenter", MoveOnEnter);
        }

        this.footer.addEventListener("mouseenter", MoveOnEnter);

        this.Update();
    }

    Close() {
        this.Update();
    }

    Move() {
        if (this.container.open)
        {
            const maxTop = window.innerHeight - this.container.scrollHeight;
            const maxLeft = window.innerWidth - this.container.scrollWidth;
            const topPosition = Math.floor(Math.random() * maxTop);
            const leftPosition = Math.floor(Math.random() * maxLeft);

            this.container.style.top = `${topPosition}px`;
            this.container.style.left = `${leftPosition}px`;
        }
    }

    Open(useTimeout) {
        if (ArePrankEnable()) {
            if (!localStorage.getItem(prankOption.lsKey)) {
                localStorage.setItem(prankOption.lsKey, true);
                return super.Open();
            }
        }
        else if (useTimeout) {
            const remainingTime = enablingDate - new Date();
            setTimeout(() => {
                return this.Open();
            }, remainingTime);
            return true;
        }

        return false;
    }

    Update() {
        this.currentMessageIndex++;
        const newMessage = this.messages[this.currentMessageIndex];

        if (newMessage && newMessage.text && !!newMessage.text.length) {
            this.messageElement.innerText = newMessage.text;
            this.subTextElement.innerText = newMessage.subText || "";
        }
        this.Move();
    }

    Validate() {
        super.Close();
    }
}
