import {ElementCreator} from "./ElementCreator.ts";
import {root} from "../../utility/Root.ts";

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

    public static createTieFighter(verticalPosition: number) : HTMLElement {
        const tie = ElementCreator.appendElement(root, 'img', 'tie', null, {src: './images/TIEfighter.png', id: 'tie'});
        tie.style.position = 'absolute';
        tie.style.top = verticalPosition + 'px';
        tie.style.left = window.innerWidth + 100 + 'px';
        return tie;
    }

    public static createShuttle(verticalPosition: number) : HTMLElement {
        const shuttle = ElementCreator.appendElement(root, 'img', 'shuttle', null, {src: './images/shuttle.png'});
        let shuttleStyle = shuttle.style;
        shuttleStyle.height = '80px';
        shuttleStyle.position = 'fixed';
        shuttleStyle.top = verticalPosition + 'px'
        shuttleStyle.left = window.innerWidth - 300 + 'px';
        return shuttle;
    }

    public static createStarDestroyer(verticalPosition: number) : HTMLElement {
        const starDestroyer = ElementCreator.appendElement(root, 'img', 'starDestroyer', null, {src: './images/starDestroyer.png'});
        let sdStyle = starDestroyer.style;
        verticalPosition ? sdStyle.top = verticalPosition + 'px' : null;
        sdStyle.height = '100px';
        sdStyle.position = 'fixed';
        sdStyle.left = window.innerWidth + 400 + 'px';
        return starDestroyer;
    }
}