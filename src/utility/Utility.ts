import {Ship} from "../ships/Ship.ts";

export class Utility{

  public static positionToNumber(position: string) {
    return Number(position.split('p')[0]);
  }

  public static rng(from: number, to: number) {
    return Math.round(Math.random() * (to - from) + from);
  }

  public static isHit(ship: Ship, shot: HTMLElement) {
    return Utility.positionToNumber(shot.style.left) > ship.getLeft() - ship.width &&
        Utility.positionToNumber(shot.style.left) < ship.getLeft() - ship.width + 30 &&
        Utility.positionToNumber(shot.style.top) > ship.getTop() &&
        Utility.positionToNumber(shot.style.top) < ship.getTop() + ship.height
  }
}