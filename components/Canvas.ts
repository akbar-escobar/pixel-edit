import { State } from "../scripts/State"
import { CtxEvent } from "../scripts/CtxEvent"
import "../Styles.css"
import { CanvasEvent } from "../scripts/CanvasEvent"

export class Canvas {
    canvasEl: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    state: State
    parent: HTMLDivElement
    constructor(state: State) {
        this.state = state
        this.parent = document.createElement("div")
        this.canvasEl = document.createElement("canvas")
        this.ctx = this.canvasEl.getContext("2d")

        new CtxEvent(state, this.canvasEl, this.ctx!)
        new CanvasEvent(state, this.canvasEl, this.parent)
    }

    create() {
        this.parent.classList.add("canvas-parent")
        document.body.appendChild(this.parent)

        const canWH = {
            w: this.state.ctxWH.w * (window.innerWidth - this.state.barSize) / this.state.ctxWH.w,
            h: this.state.ctxWH.h * (window.innerHeight - this.state.barSize) / this.state.ctxWH.h
        }
        this.canvasEl.classList.add("canvas-canvasEl")
        this.canvasEl.style.width = this.state.canvasWH.w + "px"
        this.canvasEl.style.height = this.state.canvasWH.h + "px"
        if (canWH.w < canWH.h) {
            this.canvasEl.style.right = 0 + "px"
            this.canvasEl.style.top = (window.innerHeight / 2 - canWH.w / 2 - this.state.barSize / 2) + "px"
        }
        else {
            this.canvasEl.style.left = (window.innerWidth / 2 - canWH.h / 2 + this.state.barSize / 2) + "px"
        }
        this.canvasEl.width = this.state.ctxWH.w
        this.canvasEl.height = this.state.ctxWH.h
        this.parent.appendChild(this.canvasEl)

        this.background()
    }

    background() {
        this.ctx!.fillStyle = this.state.canvasBackColA
        this.ctx!.fillRect(0, 0, this.state.ctxWH.w, this.state.ctxWH.h);
        for (let x = 0; x < this.state.canvasWH.w; x++) {
            for (let y = 0; y < this.state.canvasWH.h; y++) {
                if ((x + y) % 2 === 0) {
                    this.ctx!.fillStyle = this.state.canvasBackColB
                    this.ctx!.fillRect(x, y, this.state.brushWH.w, this.state.brushWH.h)
                }
            }
        }
    }
}
