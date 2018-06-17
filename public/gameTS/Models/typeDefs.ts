import { Constants, Config } from '../constants'

export type RandomType = {
  num: number,
  shapes: {
    [key: string]: Phaser.GameObjects.Sprite | null,
  }
}
export type DataType = {
  random: RandomType,
  frameRate: number,
  sliderPosition: number,
}
export type AddType = {
  name: string,
  sprite: Phaser.GameObjects.Sprite
}

export type tDefault = { default: Constants }

export interface iScene {
  preload(): void
  create(): void
  update(): void
}

export interface iGameConfigModel {
  type: number,
  width: Config.WIDTH,
  height: Config.HEIGHT,
  physics: tDefault,
  scene?: any,
  audio: {
    context: AudioContext
  }
}