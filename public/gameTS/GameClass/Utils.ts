import * as Phaser from 'phaser'

export class Utils {
  static move = (sprite: Phaser.GameObjects.Sprite, x: number, y: number) => {
    if(x) {
      sprite.x += x
    }
  
    if(y) {
      sprite.y += y
    }
  } 
  static generateRandomNumber = (n) => Math.floor(Math.random()*n)
  
  static destroy = (sprite: Phaser.GameObjects.Sprite) => sprite.destroy()
  
  static isEqual = (compare, n) => compare === n

}