import {ElementCreator} from "../factory/html_creator/ElementCreator.ts";
import {root} from "../utility/Root.ts";

export class VictoryScreen {
    public static show(score: number) {
        const overlay = ElementCreator.appendElement(root, 'div', null, null, {id: 'victory-overlay'});
        const container = ElementCreator.appendElement(overlay, 'div', null, null, {id: 'victory-container'});

        ElementCreator.appendElement(container, 'div', null, null, {id: 'victory-title'})
            .textContent = 'VICTORY!';

        ElementCreator.appendElement(container, 'div', null, null, {id: 'victory-message'})
            .textContent = 'The Rebels Won!';

        ElementCreator.appendElement(container, 'div', null, null, {id: 'victory-subtitle'})
            .textContent = 'The Emperor has been defeated...';

        ElementCreator.appendElement(container, 'div', null, null, {id: 'victory-score'})
            .textContent = `Final Score: ${score}`;

        const restartBtn = ElementCreator.appendElement(container, 'button', null, null, {id: 'restart-button'});
        restartBtn.textContent = 'PLAY AGAIN';
        restartBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }
}
