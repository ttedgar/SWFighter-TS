import {ElementCreator} from "./ElementCreator.ts";
import {root} from "../../utility/Root.ts";
import {Utility} from "../../utility/Utility.ts";

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
        playerShot.style.position = 'absolute';
        playerShot.style.width = '10px';
        playerShot.style.top = Utility.positionToNumber(xWingStyle.top) + 44 + 'px';
        playerShot.style.left = Utility.positionToNumber(xWingStyle.left) + 50 + 'px';
        return playerShot;
    }

    public static createDeathstarBang(deathstar: HTMLElement) : HTMLElement {
        const bigBang = ElementCreator.appendElement(root, 'img', null, null, {src: './images/explosion.gif'});
        bigBang.style.width = '150px';
        bigBang.style.position = 'absolute';
        bigBang.style.top = deathstar.style.top;
        bigBang.style.left = Utility.positionToNumber(deathstar.style.left) + 'px';
        return bigBang;
    }

    public static createBang(element: HTMLElement) : HTMLElement {
        const bang = ElementCreator.appendElement(root, 'img', null, null, {src: './images/explosion.gif'});
        bang.style.width = '50px';
        bang.style.position = 'absolute';
        bang.style.top = element.style.top;
        bang.style.left = Utility.positionToNumber(element.style.left) + 'px';
        setTimeout(() => {
            bang.remove();
        }, 500)
        return bang;
    }

    public static createTieShot(tie: HTMLElement): HTMLElement {
        const shot = ElementCreator.appendElement(root, 'img', 'tieShot', null, {src: './images/TIEshot.png'});
        shot.style.position = 'absolute';
        shot.style.height = '25px';
        shot.style.top = Utility.positionToNumber(tie.style.top) + 7 + 'px';
        shot.style.left = Utility.positionToNumber(tie.style.left) + 15 + 'px';
        return shot;
    }

    public static createMissile(shuttle: HTMLElement): HTMLElement {
        const rocket = ElementCreator.appendElement(root, 'img', 'rocket', null, {src: './images/rocket.png'});
        rocket.style.height = '8px';
        rocket.style.position = 'fixed';
        rocket.style.top = Utility.positionToNumber(shuttle.style.top) + 55 + 'px';
        rocket.style.left = Utility.positionToNumber(shuttle.style.left) + 40 + 'px';
        return rocket;
    }
}