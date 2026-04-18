import type { State } from "../State"

export class Eraser {
    ctx: CanvasRenderingContext2D
    state: State
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const pos = state.canvasMouseMoveXY
        this.ctx = ctx
        this.state = state

        // check
        this.background(pos.x, pos.y)
    }

    background(x: number, y: number) {
        this.ctx.clearRect(x, y, this.state.brushWH.w, this.state.brushWH.h)
        if ((x + y) % 2 === 0) {
            this.ctx.fillStyle = this.state.canvasBackColA
            this.ctx.fillRect(x, y, this.state.brushWH.w, this.state.brushWH.h)
        }
    }

    // TODO add something that check canvas behind 
}
