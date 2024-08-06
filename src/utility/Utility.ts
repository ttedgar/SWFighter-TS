import {Ship} from "../ships/Ship.ts";
import {Shot} from "../shot/Shot.ts";
import {Deathstar} from "../ships/Deathstar.ts";
import {XWing} from "../ships/XWing.ts";
import {root} from "./Root.ts";

export class Utility{

  public static positionToNumber(position: string): number {
    return Number(position.split('p')[0]);
  }

  public static rng(from: number, to: number): number {
    return Math.random() * (to - from) + from;
  }

  public static gameOver() {
    root.textContent = '';
    root.textContent = 'GAME OVER!';
  }

  public static convertTime(time: number, divider: number = 100): number {
    return Math.round(time / divider);
  }

  public static isTimeTo(time: number, period: number, lastTime: number = 0, divider: number = 100): boolean {
    return this.convertTime(time, divider) % period === 0 && this.convertTime(time, divider) !== lastTime;
  }
}