import {ElementCreator} from "../factory/html_creator/ElementCreator.ts";
import {root} from "../utility/Root.ts";

export class GameOverScreen {
    public static show(score: number) {
        const overlay = ElementCreator.appendElement(root, 'div', null, null, {id: 'game-over-overlay'});
        const container = ElementCreator.appendElement(overlay, 'div', null, null, {id: 'game-over-container'});

        ElementCreator.appendElement(container, 'div', null, null, {id: 'game-over-title'})
            .textContent = 'GAME OVER';

        ElementCreator.appendElement(container, 'div', null, null, {id: 'game-over-score'})
            .textContent = `Score: ${score}`;

        const restartBtn = ElementCreator.appendElement(container, 'button', null, null, {id: 'restart-button'});
        restartBtn.textContent = 'RESTART';
        restartBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }
}
