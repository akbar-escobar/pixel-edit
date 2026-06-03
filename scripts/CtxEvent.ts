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
        this.event()
    }

    event() {
        this.canvasEl.addEventListener("pointermove", (e) => {
            const client = this.state.canvasDrawXY(this.canvasEl, e.clientX, e.clientY)
            this.Tools(client.x, client.y)
        })
    }

    Tools(x: number, y: number) {
        const pos = this.state.ctxDrawXY(x, y)

        // if (this.prev === undefined) this.prev = { x: pos.x, y: pos.y }
        // this.dXY = { x: pos.x - this.prev.x, y: pos.y - this.prev.y }
        //
        // const t = 0.5
        // const lerp = { x: this.prev.x + t * this.dXY.x, y: this.prev.y + t * this.dXY.y }
        //
        // console.log("d", this.dXY.x, this.dXY.y, "p", pos.x, pos.y)

        if (this.state.toolCond === "brush") {
            this.brush.draw(pos.x, pos.y, this.state.brushCol)
        }

        if (this.state.toolCond === "eraser") {
            this.eraser.erase(pos.x, pos.y)
        }
    }
}
