import {Ship} from "../ships/Ship.ts";
import {Shot} from "../shot/Shot.ts";
import {Deathstar} from "../ships/Deathstar.ts";
import {XWing} from "../ships/XWing.ts";
import {KamikazeDrone} from "../shot/KamikazeDrone.ts";

export class ShootingMechanics{

    public static isEnemyHit(ship: Ship, shot: Shot): boolean {
        return shot.getHorizontalPosition() > ship.getLeft() - ship.width &&
            shot.getHorizontalPosition() < ship.getLeft() - ship.width + 50 &&
            shot.getVerticalPosition() > ship.getTop() &&
            shot.getVerticalPosition() < ship.getTop() + ship.height
    }

    public static isKamikazeDroneHit(drone: KamikazeDrone, shot: Shot): boolean {
        console.log(shot.getVerticalPosition(), drone.getVerticalPosition());
        return shot.getHorizontalPosition() > drone.getHorizontalPosition() &&
            shot.getHorizontalPosition() < drone.getHorizontalPosition() + 30 &&
            shot.getVerticalPosition() > drone.getVerticalPosition() &&
            shot.getVerticalPosition() < drone.getVerticalPosition() + 10
    }

    public static isPlayerHitByLaser(deathstar: Deathstar, xWing: XWing): boolean {
        return deathstar &&
            deathstar.isLaserActive &&
            deathstar.getLaserTop() > xWing.getTop() - 160 &&
            deathstar.getLaserTop() < xWing.getTop() - 100
    }

    public static isPlayerHitByShot(shot: Shot, xWing: XWing): boolean {
        return shot.getHorizontalPosition() < xWing.getLeft() + 50 &&
            shot.getHorizontalPosition() > xWing.getLeft() + 10 &&
            shot.getVerticalPosition() < xWing.getTop() + shot.top &&
            shot.getVerticalPosition() > xWing.getTop() + shot.bottom
    }

    public static isTimeToShoot(isShootEvent: boolean, time: number, lastTime: number): boolean {
        return isShootEvent &&
            Math.round(time / XWing.TIME_DIVIDER) % XWing.SHOOT_INTERVAL === 0 &&
            Math.round(lastTime / XWing.TIME_DIVIDER) !== Math.round(time / XWing.TIME_DIVIDER)
    }
}