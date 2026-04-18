import { State } from "../State"

export class Brush {
    state: State
    ctx: CanvasRenderingContext2D
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.state = state
    }

    draw(x: number, y: number) {
        const col = this.state.brushCol
        this.ctx.fillStyle = col
        this.ctx.fillRect(x, y, this.state.brushWH.w, this.state.brushWH.h)
        this.state.setBrushStack(x, y, col)
    }
}

