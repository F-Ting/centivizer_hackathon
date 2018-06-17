import {
    iGameConfigModel,
    tDefault,
    iScene
  } from './typeDefs'

export default class GameConfigModel implements iGameConfigModel {
  type: number
  width: number
  height: number
  physics: tDefault
  scene?: iScene
  audio: {
    context: AudioContext
  }
	constructor(_: GameConfigModel) {
    Object.assign(this, _)
  }
}
