import {EventTimes} from "./EventTimes.ts";

export class Event {
    public static shouldAppear(time: number, timeOfAppearance: number, lastEventTime: number): boolean {
        return Math.round(time / 100) === timeOfAppearance && Math.round(time / 100) !== lastEventTime;
    }
}