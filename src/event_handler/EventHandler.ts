export class EventHandler {
    private _up: boolean;
    private _down: boolean;
    private _left: boolean;
    private _right: boolean;
    private _shoot: boolean;
    private _singleShot: boolean

    constructor() {
        this._down = false;
        this._up = false;
        this._left = false;
        this._right = false;
        this._shoot = false;
        this._singleShot = false;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
    }

    public handleKeys() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
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
            // this._singleShot = true;
            // setTimeout(() => {
            //     this._singleShot = false;
            // }, 1)
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
            // this._singleShot = false;
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

    get singleShot(): boolean {
        return this._singleShot;
    }
}