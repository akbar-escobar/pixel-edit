import { State } from "./State"
import { Brush } from "../scripts/tools/Brush"
import { Eraser } from "../scripts/tools/Eraser"

export class Draw {
    brush: Brush
    eraser: Eraser
    state: State
    canvasEl: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    type: { start: string, move: string, end: string }
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

        this.type = { start: "", move: "", end: "" }
        window.addEventListener("pointerdown", (e) => {
            if (e.pointerType === "mouse") {
                this.type = { start: "mousedown", move: "mousemove", end: "mouseup" }
            }
            else if (e.pointerType === "touch") {
                this.type = { start: "touchstart", move: "touchmove", end: "touchend" }
            }

            this.event()
        })
    }

    event() {
        this.canvasEl.addEventListener(this.type.start, () => {
            this.state.isMouse = true
        })

        if (this.type.move === "mousemove") {
            this.canvasEl.addEventListener(this.type.move, (e) => {
                const rect = this.canvasEl.getBoundingClientRect()
                const scale = { x: rect.width / this.canvasEl.offsetWidth, y: rect.height / this.canvasEl.offsetHeight }
                if (this.state.isMouse) this.Tools(
                    Math.round((e.clientX - rect.x) / scale.x),
                    Math.round((e.clientY - rect.y) / scale.y),
                )
            })
        }

        if (this.type.move === "touchmove") {
            this.canvasEl.addEventListener(this.type.move, (e) => {
                e.preventDefault()
                const rect = this.canvasEl.getBoundingClientRect()
                const scale = { x: rect.width / this.canvasEl.offsetWidth, y: rect.height / this.canvasEl.offsetHeight }
                if (this.state.isMouse) this.Tools(
                    Math.round((e.touches[0].clientX - rect.x) / scale.x),
                    Math.round((e.touches[0].clientY - rect.y) / scale.y),
                )
            })
        }

        document.addEventListener(this.type.end, () => {
            this.state.isMouse = false
            this.ctx.beginPath()
        })
    }

    Tools(x: number, y: number) {
        this.state.setDrawMoveXY(x, y)
        const pos = this.state.drawMoveXY

        if (this.state.toolCond === "brush") {
            this.brush.draw(pos.x, pos.y, this.state.brushCol)
            this.state.setDrawStack(pos.x, pos.y, this.state.brushCol)
        }

        if (this.state.toolCond === "eraser") {
            this.eraser.erase(pos.x, pos.y)
            this.state.setDrawStack(pos.x, pos.y, "")
        }
    }
}
