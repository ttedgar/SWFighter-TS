import {Ship} from "../ships/Ship.ts";
import {Shot} from "../shot/Shot.ts";
import {Deathstar} from "../ships/Deathstar.ts";
import {XWing} from "../ships/XWing.ts";

export class ShootingMechanics{

    public static isEnemyHit(ship: Ship, shot: Shot): boolean {
        return shot.getLeft() > ship.getLeft() - ship.width &&
            shot.getLeft() < ship.getLeft() - ship.width + 50 &&
            shot.getTop() > ship.getTop() &&
            shot.getTop() < ship.getTop() + ship.height
    }

    public static isPlayerHitByLaser(deathstar: Deathstar, xWing: XWing): boolean {
        return deathstar &&
            deathstar.isLaserActive &&
            deathstar.getLaserTop() > xWing.getTop() - 160 &&
            deathstar.getLaserTop() < xWing.getTop() - 100
    }

    public static isTimeToShoot(isShootEvent: boolean, time: number, lastTime: number): boolean {
        return isShootEvent &&
            Math.round(time / XWing.TIME_DIVIDER) % XWing.SHOOT_INTERVAL === 0 &&
            Math.round(lastTime / XWing.TIME_DIVIDER) !== Math.round(time / XWing.TIME_DIVIDER)
    }
}