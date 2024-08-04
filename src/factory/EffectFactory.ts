import {ElementCreator} from "./ElementCreator.ts";
import {root} from "../utility/Root.ts";
import {Utility} from "../utility/Utility.ts";

export class EffectFactory{
    public static createDeathLaserHtml() : HTMLElement {
        const laser: HTMLElement = ElementCreator.appendElement(root, 'img', 'dsLaser', null, {src: './images/laser6.png'});
        laser.style.display = 'none';
        laser.style.position = 'fixed';
        laser.style.width = 1820 + 'px';
        laser.style.right = '35px';
        return laser;
    }

    public static createXWingShot(xWingStyle: CSSStyleDeclaration, cycle: number) : HTMLElement {
        const playerShot = ElementCreator.appendElement(root, 'img', 'shot', null, {src: './images/shot.png', id: cycle});
        const shotStyle = playerShot.style;
        shotStyle.position = 'absolute';
        shotStyle.width = '10px';
        shotStyle.top = Utility.positionToNumber(xWingStyle.top) + 44 + 'px';
        shotStyle.left = Utility.positionToNumber(xWingStyle.left) + 50 + 'px';
        return playerShot;
    }
}