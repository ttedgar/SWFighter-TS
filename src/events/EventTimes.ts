export class EventTimes{
    private static _lastTieTime: number = 0;
    private static _lastDeathstarTime: number = 0;


    static get lastTieTime(): number {
        return this._lastTieTime;
    }

    static set lastTieTime(value: number) {
        this._lastTieTime = value;
    }

    static get lastDeathstarTime(): number {
        return this._lastDeathstarTime;
    }

    static set lastDeathstarTime(value: number) {
        this._lastDeathstarTime = value;
    }
}