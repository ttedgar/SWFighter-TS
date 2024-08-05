import {Shot} from "./Shot.ts";
import {Utility} from "../utility/Utility.ts";

export class PlayerShot extends Shot {

    constructor(element: HTMLElement) {
        super(element);
    }

    private fly() {
        const interval = setInterval(() => {
            this.interval = interval;
            this.element.style.left = Utility.positionToNumber(this.element.style.left) + 20 + 'px';
            Utility.positionToNumber(this.element.style.left) > window.innerWidth - 10 ?
                (this.element.remove(), clearInterval(interval)) : null;
        }, 20);
    }

    public stop() {
        clearInterval(this.interval);
    }


}