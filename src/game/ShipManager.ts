import {Ship} from "../ships/Ship.ts";

export interface ShipManager {
    removeShip(ship: Ship);
    addShip(ship:Ship);
    getShips();
    setShips(ships: [Ship]);
    getXWing();
}