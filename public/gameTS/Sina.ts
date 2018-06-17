import { Config, PHYSICS_DEFAULT } from './constants'
import * as Phaser from 'phaser'
import GameConfigModel from './Models/GameConfig'
import GameBaseModel from './Models/GameBaseModel'
const physics = {
  default: PHYSICS_DEFAULT,
}
const context = (prop, prefix) => window.hasOwnProperty(prop) ? prop: `${prefix}${prop}`

const audioContext: AudioContext = new window[context('AudioContext', 'webkit')]();


const sceneConfig = {
  key: 'sina',
  active: true,
  visible: true,
  physics,
  plugins: true,
}

export const Sina = new GameBaseModel(sceneConfig)

export const SinaGameConfig = new GameConfigModel({
  type: Phaser.AUTO,
  width: Config.WIDTH,
  height: Config.HEIGHT,
  scene: Sina,
  audio: {
    context: audioContext
  },
  physics,
})
