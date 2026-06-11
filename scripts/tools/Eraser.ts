import type { State } from "../State"

export class Eraser {
    ctx: CanvasRenderingContext2D
    state: State
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.state = state
    }

    erase(x: number, y: number) {
        this.ctx.clearRect(x, y, this.state.brushWH.w, this.state.brushWH.h)
         this.checkBackground(x, y)
    }

    checkBackground(x: number, y: number) {
        if ((x + y) % 2 === 1) this.ctx.fillStyle = this.state.canvasBackColA
        else this.ctx.fillStyle = this.state.canvasBackColB
        this.ctx.fillRect(x, y, this.state.brushWH.w, this.state.brushWH.h)
    }
}
