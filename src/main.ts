import "phaser";
import PhaserBreakout from "./PhaserBreakout";
import "./main.css";

const config: Phaser.Types.Core.GameConfig = {
  title: "Phaser Breakout",
  backgroundColor: '#18216D',
  width: 800,
  height: 600,
  scene: PhaserBreakout
};

const game = new Phaser.Game(config);