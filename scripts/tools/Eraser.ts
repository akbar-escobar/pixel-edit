import type { State } from "../State"

export class Eraser {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const pos = state.canvasMouseMoveXY
        ctx.clearRect(pos.x, pos.y, state.brushWH.w, state.brushWH.h)
    }
}
