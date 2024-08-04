import {Ship} from "./Ship.ts";
import {EventHandler} from "../event_handler/EventHandler.ts";
import {Utility} from "../utility/Utility.ts";
import {Border} from "../utility/Border.ts";
import {EffectFactory} from "../factory/EffectFactory.ts";

export class XWing extends Ship {
    private hp: number;
    private eventHandler: EventHandler;


    constructor(element: HTMLElement, hp: number, eventHandler: EventHandler) {
        super(element, 10, 10, hp);
        this.hp = hp;
        this.eventHandler = eventHandler;
        eventHandler.handleKeys();
    }

    public handleXWing(cycle: number) {
        this.move(cycle);
    }

    private move(cycle: number) {
        if (this.eventHandler.up && Border.topBorder(this.style)) {
            this.style.top = Utility.positionToNumber(this.style.top) - 2 + 'px';
        }
        if (this.eventHandler.down && Border.bottomBorder(this.style)) {
            this.style.top = Utility.positionToNumber(this.style.top) + 2 + 'px';
        }
        if (this.eventHandler.left && Border.leftBorder(this.style)) {
            this.style.left = Utility.positionToNumber(this.style.left) - 2 + 'px';
        }
        if (this.eventHandler.right && Border.rightBorder(this.style)) {
            this.style.left = Utility.positionToNumber(this.style.left) + 2 + 'px';
        }
        if (this.eventHandler.shoot && cycle % 20 === 0) {
            this.shoot(cycle);
        }
        if (this.eventHandler.singleShot) {
            this.shoot(cycle);
        }
    }

    public shoot(cycle: number) {
        const playerShot = EffectFactory.createXWingShot(this.style, cycle);
        const interval = setInterval(() => {
            playerShot.style.left = Utility.positionToNumber(playerShot.style.left) + 20 + 'px';
            Utility.positionToNumber(playerShot.style.left) > window.innerWidth - 10 ?
                (playerShot.remove(), clearInterval(interval)) : null;
        }, 20);
    }

}