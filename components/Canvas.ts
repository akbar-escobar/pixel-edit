import { State } from "../scripts/State"
import { Brush } from "../scripts/tools/Brush"
import { Eraser } from "../scripts/tools/Eraser"

export class Canvas {
    canvasEl: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    state: State
    constructor(state: State) {
        this.state = state

        this.canvasEl = document.createElement("canvas")
        this.ctx = this.canvasEl.getContext("2d")

        this.canvasStyle(this.canvasEl)

        this.background()
        this.drawing()
    }

    canvasStyle(el: HTMLCanvasElement) {
        el.style.position = "absolute"
        el.style.right = `${this.state.canvasXY.x}px`
        el.style.imageRendering = "pixelated"
        el.style.width = this.state.canvasWH.w + "px"
        el.style.height = this.state.canvasWH.h + "px"
        el.width = this.state.ctxWH.w
        el.height = this.state.ctxWH.h
        document.body.appendChild(el)
    }

    background() {
        if (!this.ctx) return
        const ctx = this.ctx

        ctx.fillStyle = this.state.canvasBackColA
        this.canvasEl.style.backgroundColor = this.state.canvasBackColB
        for (let indexX = 0; indexX < this.state.ctxWH.w; indexX++) {
            for (let indexY = 0; indexY < this.state.ctxWH.h; indexY++) {
                if ((indexX + indexY) % 2 === 0) {
                    ctx.fillRect(indexX, indexY, 1, 1);
                }
            }
        }
    }

    drawing() {
        if (!this.ctx) return
        const ctx = this.ctx
        const cond = this.state.toolCond
        let isMouse = false

        this.canvasEl.addEventListener("mousedown", (e) => {
            isMouse = true
            this.state.setCanvasMouseMoveXY(e.offsetX, e.offsetY)
            if (cond === "brush") new Brush(this.state, ctx)
            if (cond === "eraser") new Eraser(this.state, ctx)
        })

        this.canvasEl.addEventListener("mousemove", (e) => {
            if (isMouse) {
                console.log(cond)
                this.state.setCanvasMouseMoveXY(e.offsetX, e.offsetY)
                if (cond === "brush") new Brush(this.state, ctx)
                if (cond === "eraser") new Eraser(this.state, ctx)
            }
        })

        document.addEventListener("mouseup", () => {
            isMouse = false
            ctx.beginPath();
        })
    }
}
