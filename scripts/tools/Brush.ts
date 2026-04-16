import type { State } from "../State"

export class Brush {
    constructor(state: State, ctx: CanvasRenderingContext2D, x: number, y: number) {
        const posX = Math.round(x / state.canvasS - (state.brushWH.w / 2))
        const posY = Math.round(y / state.canvasS - (state.brushWH.h / 2))
        console.log("FGHJ")
        ctx.fillStyle = "red"
        ctx.fillRect(posX, posY, state.brushWH.w, state.brushWH.h)
    }
}
