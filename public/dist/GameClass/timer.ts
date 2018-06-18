interface iTimer {
  start(init: Date): void
  stop(): number
  clear(): void
}


export default class Timer implements iTimer {
  private _time: number
  
  private _timer: any

  private _updateTime = (n: number): void => {
    this._time = n
  }

  public start(init: Date) {
    const tStart = Date.now()
    this._timer = setInterval(()=> (
      this._updateTime(Date.now() - init.getTime())
    ), 100)
    return this
  }

  public stop() {
    clearInterval(this._timer)
    this._timer = null
    return this._time
  }

  public clear() {
    this._timer = 0
  }
}

