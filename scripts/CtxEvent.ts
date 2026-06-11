import { State } from "./State"
import { Brush } from "../scripts/tools/Brush"
import { Eraser } from "../scripts/tools/Eraser"

export class CtxEvent {
    brush: Brush
    eraser: Eraser
    state: State
    canvasEl: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    prev: { x: number, y: number } | undefined
    isFill: boolean
    dXY: { x: number, y: number }
    lerp: { x: number, y: number }
    constructor(
        state: State,
        canvasEl: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ) {
        this.state = state
        this.brush = new Brush(state, ctx)
        this.eraser = new Eraser(state, ctx)
        this.canvasEl = canvasEl
        this.ctx = ctx
        this.prev = undefined
        this.isFill = false
        this.dXY = { x: -1, y: -1 }
        this.lerp = { x: -1, y: -1 }
        this.event()
    }

    event() {
        this.canvasEl.addEventListener("pointermove", (e) => {
            const drawXY = this.state.drawXY(this.canvasEl, e.clientX, e.clientY)
            this.lerpFunc(drawXY)
        })

        document.body.addEventListener("pointerup", () => {
            this.prev = undefined
            this.dXY = { x: -1, y: -1 }
            this.lerp = { x: -1, y: -1 }
        })
    }

    lerpFunc(drawXY: { x: number, y: number }) {
        if (this.prev === undefined) this.prev = { x: drawXY.x, y: drawXY.y }
        this.dXY = { x: drawXY.x - this.prev.x, y: drawXY.y - this.prev.y }
        let t = 0
        while (t <= 1) {
            this.lerp = { x: this.prev.x + this.dXY.x * t, y: this.prev.y + this.dXY.y * t }
            this.tools(Math.round(this.lerp.x), Math.round(this.lerp.y))
            t += 0.1
        }
        this.prev = { x: drawXY.x, y: drawXY.y }
    }

    tools(x: number, y: number) {
        if (this.state.toolCond === "brush") {
            this.brush.draw(x, y, this.state.brushCol)
        }

        if (this.state.toolCond === "eraser") {
            this.eraser.erase(x, y)
        }
    }
}
