export class EventTimes{
    private static _lastTieTime: number = 0;
    private static _lastDeathstarTime: number = 0;
    private static _lastShuttleTime: number = 0;
    private static _lastStarDestroyerTime: number = 0;
    private static _lastTeleporterTime: number = 0;

    static get lastTeleporterTime(): number {
        return this._lastTeleporterTime;
    }

    static set lastTeleporterTime(value: number) {
        this._lastTeleporterTime = value;
    }

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

    static get lastStarDestroyerTime(): number {
        return this._lastStarDestroyerTime;
    }

    static set lastStarDestroyerTime(value: number) {
        this._lastStarDestroyerTime = value;
    }
}