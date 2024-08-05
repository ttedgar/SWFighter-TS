export class EventHandler {
    private _up: boolean;
    private _down: boolean;
    private _left: boolean;
    private _right: boolean;
    private _shoot: boolean;

    constructor() {
        this._down = false;
        this._up = false;
        this._left = false;
        this._right = false;
        this._shoot = false;
    }

    public handleKeys() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event : KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            this._down = true;
        }
        if (event.key === 'ArrowUp') {
            this._up = true;
        }
        if (event.key === 'ArrowLeft') {
            this._left = true;
        }
        if (event.key === 'ArrowRight') {
            this._right = true;
        }
        if (event.key === 's') {
            this._shoot = true;
        }
    }

    private handleKeyUp(event : KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            this._down = false;
        }
        if (event.key === 'ArrowUp') {
            this._up = false;
        }
        if (event.key === 'ArrowLeft') {
            this._left = false;
        }
        if (event.key === 'ArrowRight') {
            this._right = false;
        }
        if (event.key === 's') {
            this._shoot = false;
        }
    }

    get up(): boolean {
        return this._up;
    }

    get down(): boolean {
        return this._down;
    }

    get left(): boolean {
        return this._left;
    }

    get right(): boolean {
        return this._right;
    }

    get shoot(): boolean {
        return this._shoot;
    }
}