import {Ship} from "../ships/Ship.ts";
import {XWing} from "../ships/XWing.ts";

export interface ShipManager {
    removeShip(ship: Ship);
    addShip(ship:Ship);
    getShips(): [Ship];
    setShips(ships: [Ship]);
    getXWing() : XWing;
}