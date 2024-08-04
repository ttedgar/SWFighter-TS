import './style.css';
import {GameLogic} from "./game/GameLogic.ts";

const gameLogic: GameLogic = new GameLogic();

function main() {
  gameLogic.run();
}

main();