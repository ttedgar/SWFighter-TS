import {ElementCreator} from "../factory/html_creator/ElementCreator.ts";
import {root} from "../utility/Root.ts";

export class RestartConfirmation {
    private static selectedButton: number = 0; // 0 for YES, 1 for NO
    private static confirmBtn: HTMLElement;
    private static cancelBtn: HTMLElement;
    private static overlay: HTMLElement;

    public static show() {
        this.selectedButton = 0;

        this.overlay = ElementCreator.appendElement(root, 'div', null, null, {id: 'restart-confirmation'});
        const box = ElementCreator.appendElement(this.overlay, 'div', null, null, {id: 'restart-confirmation-box'});

        ElementCreator.appendElement(box, 'div', null, null, {id: 'restart-confirmation-text'})
            .textContent = 'Restart Game?';

        const buttonsContainer = ElementCreator.appendElement(box, 'div', null, null, {id: 'restart-confirmation-buttons'});

        this.confirmBtn = ElementCreator.appendElement(buttonsContainer, 'button', null, null, {id: 'confirm-restart', class: 'restart-confirmation-btn'});
        this.confirmBtn.textContent = 'YES';
        this.confirmBtn.addEventListener('click', () => {
            window.location.reload();
        });

        this.cancelBtn = ElementCreator.appendElement(buttonsContainer, 'button', null, null, {id: 'cancel-restart', class: 'restart-confirmation-btn'});
        this.cancelBtn.textContent = 'NO';
        this.cancelBtn.addEventListener('click', () => {
            this.close();
        });

        this.updateButtonSelection();
        window.addEventListener('keydown', this.handleKeyboardInput.bind(this));
    }

    private static updateButtonSelection() {
        this.confirmBtn.classList.remove('selected');
        this.cancelBtn.classList.remove('selected');

        if (this.selectedButton === 0) {
            this.confirmBtn.classList.add('selected');
        } else {
            this.cancelBtn.classList.add('selected');
        }
    }

    private static handleKeyboardInput(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            this.selectedButton = this.selectedButton === 0 ? 1 : 0;
            this.updateButtonSelection();
        } else if (event.key === 'Enter') {
            if (this.selectedButton === 0) {
                window.location.reload();
            } else {
                this.close();
            }
        }
    }

    private static close() {
        window.removeEventListener('keydown', this.handleKeyboardInput.bind(this));
        this.overlay.remove();
    }
}
