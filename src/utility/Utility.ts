import {GameOverScreen} from "../infobar/GameOverScreen.ts";

export class Utility{

  public static positionToNumber(position: string): number {
    return Number(position.split('p')[0]);
  }

  public static rng(from: number, to: number): number {
    return Math.random() * (to - from) + from;
  }

  public static gameOver(score: number = 0) {
    GameOverScreen.show(score);
  }

  public static convertTime(time: number, divider: number = 100): number {
    return Math.round(time / divider);
  }

  public static isTimeTo(time: number, period: number, lastTime: number = 0, divider: number = 100): boolean {
    return this.convertTime(time, divider) % period === 0 && this.convertTime(time, divider) !== lastTime;
  }
}