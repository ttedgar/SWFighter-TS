import {ElementCreator} from "../factory/html_creator/ElementCreator.ts";
import {root} from "../utility/Root.ts";


export class InfoBar {

    public static createInfoBar(playerHp: number) {
        const infoBar: HTMLElement = ElementCreator.appendElement(root, 'div', 'infobar', null, {id: 'infobar'});
        ElementCreator.appendElement(infoBar, 'div', 'lives', null, {id: 'lives'});
        InfoBar.displayLives(playerHp);
    }

    public static displayLives(playerHP: number) {
        const lives = document.getElementById('lives') as HTMLElement;
        for (let i = 0; i < playerHP; i++) {
            ElementCreator.appendElement(lives, 'img', 'life', null, {src: './images/Luke.png'});
        }
    }

    public static refreshLives(playerHP: number) {
        InfoBar.clearLives();
        InfoBar.displayLives(playerHP);
    }

    public static clearLives() {
        const lifeArray = Array.from(document.getElementsByClassName("life"));
        lifeArray.forEach((life) => {
            life.remove();
        })
    }

    public static startHitPulse() {
        const lives = document.getElementById('lives');
        if (lives) {
            lives.classList.add('active');
        }
    }

    public static stopHitPulse() {
        const lives = document.getElementById('lives');
        if (lives) {
            lives.classList.remove('active');
        }
    }
}