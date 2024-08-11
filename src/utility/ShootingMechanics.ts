import {Ship} from "../ships/Ship.ts";
import {Shot} from "../shot/Shot.ts";
import {Deathstar} from "../ships/Deathstar.ts";
import {XWing} from "../ships/XWing.ts";
import {KamikazeDrone} from "../shot/KamikazeDrone.ts";

export class ShootingMechanics{

    public static isEnemyHit(ship: Ship, shot: Shot): boolean {
        return shot.getHorizontalPosition() > ship.getHorizontalPosition() - ship.width &&
            shot.getHorizontalPosition() < ship.getHorizontalPosition() - ship.width + 50 &&
            shot.getVerticalPosition() > ship.getVerticalPosition() &&
            shot.getVerticalPosition() < ship.getVerticalPosition() + ship.height
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
            deathstar.getLaserTop() > xWing.getVerticalPosition() - 160 &&
            deathstar.getLaserTop() < xWing.getVerticalPosition() - 100
    }

    public static isPlayerHitByShot(shot: Shot, xWing: XWing): boolean {
        return shot.getHorizontalPosition() < xWing.getHorizontalPosition() + xWing.width * 2 &&
            shot.getHorizontalPosition() > xWing.getHorizontalPosition() - xWing.width / 2 &&
            shot.getVerticalPosition() < xWing.getVerticalPosition() + xWing.height &&
            shot.getVerticalPosition() > xWing.getVerticalPosition()
    }

    public static isCrashed(ship: Ship, ship2: Ship): boolean {
        return ship.getHorizontalPosition() < ship2.getHorizontalPosition() + ship2.width &&
            ship.getHorizontalPosition() > ship2.getHorizontalPosition() - ship.width &&
            ship.getVerticalPosition() < ship2.getVerticalPosition() + ship2.height &&
            ship.getVerticalPosition() > ship2.getVerticalPosition() - ship.height
    }

    public static isTimeToShoot(isShootEvent: boolean, time: number, lastTime: number): boolean {
        return isShootEvent &&
            Math.round(time / XWing.TIME_DIVIDER) % XWing.SHOOT_INTERVAL === 0 &&
            Math.round(lastTime / XWing.TIME_DIVIDER) !== Math.round(time / XWing.TIME_DIVIDER)
    }
}