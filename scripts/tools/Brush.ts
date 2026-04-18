import type { State } from "../State"

export class Brush {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const pos = state.canvasMouseMoveXY
        ctx.fillStyle = "red"
        ctx.fillRect(pos.x, pos.y, state.brushWH.w, state.brushWH.h)
    }
}
