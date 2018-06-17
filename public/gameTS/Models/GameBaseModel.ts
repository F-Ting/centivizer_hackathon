import * as Phaser from 'phaser'
import { Store } from '../Store'
import { Utils } from '../GameClass/Utils'
import { AddType } from './typeDefs'
import {
    MID, 
    MIN, 
    MAX, 
    ARROW_SKY,
    COORD_SPRITE, 
    CIRCLE,
    SQUARE,
    TRIANGLE,
    MOVEMENT,
    CORRECT,
    DEFAULT_INSTANCES,
  } from '../constants' 
import { INTIAL_STATE } from './constants'

const {
    isEqual,
    generateRandomNumber, 
    move,
    destroy,
  } = Utils

const instances = {
  instances: DEFAULT_INSTANCES,
}


export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  public data = new Phaser.Data.DataManager(this, new Phaser.Events.EventEmitter())

  private state = new Map<string, any>(Object.entries(INTIAL_STATE))

  public dataStore = new Store(this)
    
  addSprite = (
      x: number, 
      y: number, 
      name: string
    ): AddType => ({
          name: name,
          sprite: this.physics.add.sprite(x, y, name)
        })

  handleCorrectInput = () => {
    this.state.set('correct', true)
    this.state.set(MOVEMENT, true)
  }

  addArrow = (dir = '') => (
    this.addSprite(MID, ARROW_SKY, `arrow${dir}`)
  )
  handleSliderInput = (position) => {
    const { addArrow } = this 

    if(position <= 20) return addArrow('Left')
    
    if(position <= 45) return addArrow()

    if(position > 45) return addArrow('Right')
  }

  handleMouseEvents = ({ answer, number, arrow}) => {
    const handleAddArrow = (dir = '') => {
      const newArrow = this.addArrow(dir).sprite
      this.state.set('arrow', newArrow)
    }

    const isAnswerEqual = shape => isEqual(answer, shape)
    destroy(number)
    const randomNumber = this.addSprite(MID, 500, answer)
    destroy(arrow)

    if(this.input.x<=150) {
      handleAddArrow('left')
      if(isAnswerEqual('circle')) {
          return this.handleCorrectInput()
      }
    }
    
    if(this.input.x >350 && this.input.x<=450) {
      handleAddArrow()
       if(isAnswerEqual('triangle')) {
        return this.handleCorrectInput()
      }
    }
    
    if (this.input.x >650 && this.input.x<=750){
       handleAddArrow('right')
       if (isAnswerEqual("square")) {
        return this.handleCorrectInput()
      }
  }
}
  

  handleFramerate = (framerate) => {
    const currentShape = this.state.get('currentShape')
    const number = this.state.get('number')
    const changeCurrentNumber = (n) => {
      const { sprite } = this.addSprite(MID, ARROW_SKY, n)
      return this.state.set('number', sprite)
    }
    if(isEqual(framerate, 0)) {
      return [currentShape, number].forEach(sprite => destroy(sprite))
    }

    const updatedRate = framerate - 1
    if(isEqual((updatedRate % 100), 0)) {
      this.sound.play('countdown')
      destroy(number)
      const currentNumber = updatedRate/100
      
      if(isEqual(currentNumber, 2)) {
        return changeCurrentNumber('two')
      } 

      if(isEqual(currentNumber, 1)) {
        return changeCurrentNumber('one')
      }
    }
  }
  setShape = shape => {
    const { sprite, name } = this.addSprite(400, 400, shape)
    this.state.set('currentShape', sprite)
    this.state.set('answer', name)
  }

  preload(): void {
    this.load.image('sky', '../assets/background.png');
    this.load.image(SQUARE, '../assets/square.png');
    this.load.image(CIRCLE, '../assets/circle.png');
    this.load.image(TRIANGLE, '../assets/triangle.png');
    this.load.image('arrow', '../assets/arrow.png');
    this.load.image('arrowLeft', '../assets/arrow-left.png');
    this.load.image('arrowRight', '../assets/arrow-right.png');
    this.load.audio('ding', ['../assets/ding.mp3'], instances);
    this.load.audio('countdown', ['../assets/countdown.mp3'], instances);
    this.load.image('one', '../assets/one.png');
    this.load.image('two', '../assets/two.png');
    this.load.image('three', '../assets/three.png');
  }
  
  create(): void {
    const { add, state, addSprite, setShape } = this
    add.image(MID, ARROW_SKY, 'sky')
    const circle = addSprite(MIN, MIN, CIRCLE)
    const triangle = addSprite(MIN, MIN, TRIANGLE)
    const square = addSprite(MAX, MIN, SQUARE)
    const arrow = addSprite(MID, ARROW_SKY, 'arrow')
    const three = addSprite(MID, COORD_SPRITE, 'three')
    const button = addSprite(MAX, COORD_SPRITE, 'button')
    state.set('number', three.sprite)
    const sprites = [circle, triangle, square, arrow, button]
      .map(({ name, sprite }) => (
        state.set(name, sprite)
      ))
    this.sound.add('ding')
    this.sound.add('countdown')
    
    const randomNumber = generateRandomNumber(3)

    switch(randomNumber) {
      case 0: return setShape(CIRCLE)
      case 1: return setShape(TRIANGLE)
      case 2: return setShape(SQUARE)
    }
  }

  update(): void {
    const arrow = this.state.get('arrow')
    if(arrow) {
      destroy(arrow)
    }

    this.dataStore.subscribe('using slider', ({ position }) => {
      this.state.set('sliderPosition', position)
      const { sprite } = this.handleSliderInput(position)
      this.state.set('arrow', sprite)
    }, this)

    this.dataStore.subscribe('lever pulled', () => {
      this.state.set('leverDown', true)
    })
  
    if(this.state.get('leverDown')) {
      destroy(this.state.get('number'))
      const answer = this.state.get('answer')
      const arrow = this.state.get('arrow')
      const number = this.state.get('number')
      const framerate = this.state.get('framerate')
      const sliderPosition = this.data.get('position')
      const randomShape = this.physics.add.sprite(MID, ARROW_SKY, answer)

      this.data.set('destroyRandomShape', ()=> destroy(randomShape))

      if(sliderPosition <= 20 && answer === CIRCLE) {
        this.handleCorrectInput()
      } else if(sliderPosition <= 45 && answer === TRIANGLE) {
        this.handleCorrectInput()
      } else if(sliderPosition > 45) {
        this.handleCorrectInput()
      }

      if(this.input.mouse.manager.activePointer.isDown && isEqual(framerate, 0)) {
        this.handleMouseEvents({ answer, arrow, number })
      }
      
      const correct = this.state.get('correct')

      if(correct) {
        this.data.set('frameRate', 300)
     
        if(randomShape.y > 100) {
          randomShape.y -= 15
        }

        switch(answer) {
          case CIRCLE: {
            this.data.set('sprite', CIRCLE)
            if(randomShape.x > 100) {
              randomShape.x -= 15
            }
          }
          break;
          case SQUARE: {
            this.data.set('sprite', SQUARE)
            if(randomShape.x < 700) {
              randomShape.x += 15
            }
          }
          break;
          case TRIANGLE: {
            this.data.set('sprite', TRIANGLE)
          }
          break;
        }
      }
      this.state.set('leverDown', false)
    }

    const movement = this.state.get(MOVEMENT)
    const up = this.state.get('direction.up')
    const sprite = this.data.get('sprite')

    if(movement) {
      if(up) {
        if(sprite.y >= 70) {
          move(sprite, null, -3)
        } else {
           this.sound.play('ding')
           this.state.set('direction.up', !up)
        }
      } else {
          if(sprite.y >= 100) {
            this.state.set(MOVEMENT, false)
            this.data.set('jump.isCompleted', true)
          }
          move(sprite, null, 3)
      }
    }

    let randomShape;

    if(this.data.get('jump.isCompleted')) {
      const num = generateRandomNumber(3)
      const { name: number } = this.addSprite(MID, COORD_SPRITE, 'three')
      this.data.set('jump.isCompleted', false)
      this.data.get('destroyRandomShape')()
      

      randomShape = isEqual(num, 0) 
        ? this.setShape(CIRCLE)
        : isEqual(num, 1) 
          ? this.setShape(TRIANGLE)
        : this.setShape(SQUARE)

        this.state.set(MOVEMENT, !movement)
        this.state.set(CORRECT, false)
        this.state.set('direction.up', true)
        this.state.set('number', number)
    }

    this.handleFramerate(this.data.get('frameRate'))
  }
}
