import type { State } from "../State"

export class Eraser {
    constructor(state: State, ctx: CanvasRenderingContext2D, x: number, y: number) {
        const posX = Math.round(x / state.canvasS - (state.brushWH.w / 2))
        const posY = Math.round(y / state.canvasS - (state.brushWH.h / 2))
        ctx.clearRect(posX, posY, state.brushWH.w, state.brushWH.h)
    }
}
