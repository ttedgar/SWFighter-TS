export class Scheduler {
    private lastTime: number = 0;

    public shouldFire(time: number, timeOfAppearance: number): boolean {
        const bucket = Math.round(time / 100);
        if (bucket === timeOfAppearance && bucket !== this.lastTime) {
            this.lastTime = bucket;
            return true;
        }
        return false;
    }
}
