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
            this.lerpFunc(drawXY.x, drawXY.y, (lerp) => {
                this.tools(lerp.x, lerp.y)
            })
            // this.tools(drawXY.x, drawXY.y)
            this.state.setStroke(drawXY.x, drawXY.y, this.state.brushCol)
        })

        document.body.addEventListener("pointerup", () => {
            this.prev = undefined
            this.dXY = { x: -1, y: -1 }
            this.lerp = { x: -1, y: -1 }
            this.state.setHistory()
        })
    }

    lerpFunc(x: number, y: number, callback: (lerp: { x: number, y: number }) => void) {
        if (this.prev === undefined) this.prev = { x: x, y: y }
        this.dXY = { x: x - this.prev.x, y: y - this.prev.y }
        let t = 0
        while (t <= 1) {
            this.lerp = {
                x: Math.round(this.prev.x + this.dXY.x * t),
                y: Math.round(this.prev.y + this.dXY.y * t)
            }
            callback(this.lerp)
            t += 0.1
        }
        this.prev = { x: x, y: y }
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
