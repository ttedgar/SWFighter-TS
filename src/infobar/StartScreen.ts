import {ElementCreator} from "../factory/html_creator/ElementCreator.ts";
import {root} from "../utility/Root.ts";

export class StartScreen {
    public static show() {
        const overlay = ElementCreator.appendElement(root, 'div', null, null, {id: 'start-overlay'});
        const container = ElementCreator.appendElement(overlay, 'div', null, null, {id: 'start-container'});

        ElementCreator.appendElement(container, 'div', null, null, {id: 'start-title'})
            .textContent = 'STAR WARS FIGHTER';

        const controls = ElementCreator.appendElement(container, 'div', null, null, {id: 'start-controls'});

        ElementCreator.appendElement(controls, 'div', null, null, {id: 'control-item'})
            .textContent = '↑↓←→ - MOVE';

        ElementCreator.appendElement(controls, 'div', null, null, {id: 'control-item'})
            .textContent = 'S - SHOOT';

        ElementCreator.appendElement(controls, 'div', null, null, {id: 'control-item'})
            .textContent = 'R - RESTART';

        setTimeout(() => {
            overlay.remove();
        }, 5000);
    }
}
