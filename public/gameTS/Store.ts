import * as EventEmitter from 'eventemitter3'

export class Store extends EventEmitter {
  constructor(public ctx) {
    super()
  }

  dispatch = (
      event, 
      emitEvent, 
      ctx = this.ctx
    ) => super.emit(event, emitEvent, ctx)
  
  subscribe = (
      event,
      emitted,
      ctx = this.ctx
    ) => super.on(event, emitted, ctx)

  subscribeOnce = (
    event,
    emitted,
    ctx = this.ctx,
  ) => super.once(event, emitted, ctx)

  delete = (
    event,
    emitted
  ) => super.removeListener(event, emitted, this.ctx)
}

