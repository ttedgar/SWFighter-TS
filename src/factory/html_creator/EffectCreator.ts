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
        playerShot.style.zIndex = '3';
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

    public static createBang2(element: HTMLElement) : HTMLElement {
        const bang = ElementCreator.appendElement(root, 'img', null, null, {src: './images/asteroids/explosion.gif'});
        bang.style.width = '200px';
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
        shot.style.height = '5px';
        shot.style.top = Utility.positionToNumber(tie.style.top) + Utility.positionToNumber(tie.style.height)/2 + 'px';
        shot.style.left = Utility.positionToNumber(tie.style.left) + Utility.positionToNumber(tie.style.width) + 'px';
        return shot;
    }

    public static createBlasterShot(tie: HTMLElement): HTMLElement {
        const shot = ElementCreator.appendElement(root, 'img', 'tieShot', null, {src: './images/TIEshot.png'});
        shot.style.position = 'absolute';
        shot.style.height = '10px';
        shot.style.top = Utility.positionToNumber(tie.style.top) + 30 + 'px';
        shot.style.left = Utility.positionToNumber(tie.style.left) + 15 + 'px';
        return shot;
    }

    public static createJuditCruiserShot(tie: HTMLElement): HTMLElement {
        const shot = ElementCreator.appendElement(root, 'img', 'tieShot', null, {src: './images/TIEshot.png'});
        shot.style.position = 'absolute';
        shot.style.height = '5px';
        shot.style.top = Utility.positionToNumber(tie.style.top) + 10 + 'px';
        shot.style.left = Utility.positionToNumber(tie.style.left) + 45 + 'px';
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

    public static createTractorBeam(starDestroyer: HTMLElement): HTMLElement {
        let beam = ElementCreator.appendElement(root, 'img', 'beam', null, {src: './images/beam2.png'});
        beam.style.width = 1000 + 'px';
        beam.style.position = 'fixed'
        beam.style.display = 'none';
        beam.style.top = Utility.positionToNumber(starDestroyer.style.top) - 400 + 'px';
        beam.style.left = Utility.positionToNumber(starDestroyer.style.left) - 700 + 'px';
        return beam;
    }

    public static createKamikazeDrone(starDestroyer: HTMLElement): HTMLElement {
        let beam = ElementCreator.appendElement(root, 'img', 'drone', null, {src: './images/drone4.gif'});
        beam.style.width = 15 + 'px';
        beam.style.position = 'fixed'
        beam.style.top = Utility.positionToNumber(starDestroyer.style.top) + 40 + 'px';
        beam.style.left = Utility.positionToNumber(starDestroyer.style.left) + 30 + 'px';
        return beam;
    }

    public static createVortex1(teleporter: HTMLElement): HTMLElement {
        let teleport1 = ElementCreator.appendElement(root, 'img', 'drone', null, {src: './images/teleport2.gif'});
        teleport1.style.zIndex = '1';
        teleport1.style.display = 'none';
        teleport1.style.width = 200 + 'px';
        teleport1.style.position = 'fixed'
        teleport1.style.top = Utility.positionToNumber(teleporter.style.top) - 85 + 'px';
        teleport1.style.left = Utility.positionToNumber(teleporter.style.left) - 50 + 'px';
        return teleport1;
    }

    public static createVortex2(teleporter: HTMLElement): HTMLElement {
        let teleport2 = ElementCreator.appendElement(root, 'img', 'drone', null, {src: './images/teleport1reverse.gif'});
        teleport2.style.display = 'none';
        teleport2.classList.add('opaque')
        teleport2.style.transform = 'rotate(90deg)'
        teleport2.style.width = 100 + 'px';
        teleport2.style.position = 'fixed'
        teleport2.style.top = Utility.positionToNumber(teleporter.style.top) - 60 + 'px';
        teleport2.style.left = Utility.positionToNumber(teleporter.style.left) + 'px';
        return teleport2;
    }
}