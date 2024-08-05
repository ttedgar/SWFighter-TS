import {ElementCreator} from "./ElementCreator.ts";
import {root} from "../../utility/Root.ts";
import {Deathstar} from "../../ships/Deathstar.ts";

export class ShipCreator {
    public static createDeathStarHtml() : HTMLElement {
        const ds: HTMLElement = ElementCreator.appendElement(root, 'img', 'deathStar', null, {src: './images/deathstar.png', id: 'deathstar'})
        ds.style.height = '200px'
        ds.style.position = 'fixed';
        ds.style.left = window.innerWidth - 220 + 'px';
        return ds;
    }

    public static createXWingHtml() : HTMLElement {
        const xWing: HTMLElement = ElementCreator.appendElement(root, 'img', 'xWing', null, {src: './images/XWingright.png', id: 'xwing'});
        xWing.style.position = 'relative';
        xWing.style.top = window.innerHeight/2 + 'px';
        xWing.style.height = '75px';
        return xWing;
    }

    public static createTieFighter(horizontalPosition: number) : HTMLElement {
        const tie = ElementCreator.appendElement(root, 'img', 'tie', null, {src: './images/TIEfighter.png', id: 'tie'});
        tie.style.position = 'absolute';
        tie.style.top = horizontalPosition + 'px';
        tie.style.left = window.innerWidth + 100 + 'px';
        return tie;
    }
}