export class EventTimes{
    private static _lastTieTime: number = 0;
    private static _lastDeathstarTime: number = 0;
    private static _lastShuttleTime: number = 0;

    static get lastShuttleTime(): number {
        return this._lastShuttleTime;
    }

    static set lastShuttleTime(value: number) {
        this._lastShuttleTime = value;
    }



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