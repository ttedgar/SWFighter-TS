import {Ship} from "../ships/Ship.ts";
import {XWing} from "../ships/XWing.ts";

export interface ShipManager {
    removeShip(ship: Ship): void;
    addShip(ship: Ship): void;
    getShips(): Ship[];
    setShips(ships: Ship[]): void;
    getXWing(): XWing;
}