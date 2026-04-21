import { State } from "../scripts/State"
import { Brush } from "../scripts/tools/Brush"
import { Eraser } from "../scripts/tools/Eraser"
import { Parent } from "./Parent"

export class Canvas {
    canvasEl: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    state: State
    isMouse: boolean
    parent: Parent
    constructor(state: State, parent: Parent) {
        this.state = state
        this.parent = parent

        this.isMouse = false

        this.canvasEl = document.createElement("canvas")
        this.ctx = this.canvasEl.getContext("2d")

        this.style()
        this.background()
        this.addEvent()
        this.drawing()
    }

    style() {
        const parent = this.parent.el
        this.canvasEl.style.position = "absolute"
        this.canvasEl.style.right = `${this.state.canvasXY.x}px`
        this.canvasEl.style.imageRendering = "pixelated"
        this.canvasEl.style.width = this.state.canvasWH.w + "px"
        this.canvasEl.style.height = this.state.canvasWH.h + "px"
        this.canvasEl.width = this.state.ctxWH.w
        this.canvasEl.height = this.state.ctxWH.h
        parent.appendChild(this.canvasEl)
    }

    background() {
        // TODO make a checker pattern
        // for soe reason the earlier versio make it jitterig
        if (!this.ctx) return
        this.ctx.fillStyle = "yellow"
        this.ctx.fillRect(0, 0, this.state.ctxWH.w, this.state.ctxWH.h);
    }

    drawing() {
        if (!this.ctx) return
        const ctx = this.ctx

        this.canvasEl.addEventListener("mousedown", (e) => {
            this.isMouse = true
            this.state.setCanvasMouseMoveXY(e.offsetX, e.offsetY)
            this.state.setBrushStackCache({ cond: "remove" })

            if (this.state.toolCond === "brush")
                new Brush(this.state, ctx)
                    .draw(this.state.canvasMouseMoveXY.x, this.state.canvasMouseMoveXY.y)
            if (this.state.toolCond === "eraser") new Eraser(this.state, ctx)
        })

        this.canvasEl.addEventListener("mousemove", (e) => {
            if (this.isMouse) {
                this.state.setCanvasMouseMoveXY(e.offsetX, e.offsetY)
                this.state.setBrushStackCache({ cond: "remove" })

                if (this.state.toolCond === "brush")
                    new Brush(this.state, ctx)
                        .draw(this.state.canvasMouseMoveXY.x, this.state.canvasMouseMoveXY.y)
                if (this.state.toolCond === "eraser") new Eraser(this.state, ctx)
            }
        })

        document.addEventListener("mouseup", () => {
            this.isMouse = false
            ctx.beginPath();
        })
    }

    addEvent() {
        let isMove = false
        const parent = this.parent.el

        parent.addEventListener("mousedown", () => {
            isMove = true
        })

        parent.addEventListener("mousemove", (e) => {
            if (isMove && !this.isMouse) {
                this.canvasEl.style.top = (e.y - this.state.canvasWH.h / 2) + "px"
                this.canvasEl.style.left = (e.x - this.state.canvasWH.w / 2) + "px"
            }
        })

        parent.addEventListener("mouseup", () => {
            isMove = false
        })

        let s = 1
        parent.addEventListener("wheel", (e) => {
            if (e.deltaY > 0 && s < 0.9) s += 0.03
            if (e.deltaY < 0 && s > 0.2) s -= 0.03
            this.canvasEl.style.transform = `scale(${s.toFixed(2)})`
        })
    }
}
