import { State } from "../scripts/State"
import { Body} from "./Body"
import { Draw } from "../scripts/Draw"
import { CanvasEvent } from "../scripts/CanvasEvent"

export class Canvas {
    canvasEl: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    state: State
    bodyEl: HTMLElement
    constructor(state: State, body: Body) {
        this.state = state
        this.bodyEl = body.zMin1
        this.canvasEl = document.createElement("canvas")
        this.ctx = this.canvasEl.getContext("2d")

        this.style()
        this.background()

        new Draw(state, this.canvasEl, this.ctx!)
        new CanvasEvent(state, this.canvasEl, this.bodyEl)
    }

    style() {
        this.canvasEl.style.position = "absolute"
        this.canvasEl.style.right = `${this.state.canvasXY.x}px`
        this.canvasEl.style.imageRendering = "pixelated"
        this.canvasEl.style.width = this.state.canvasWH.w + "px"
        this.canvasEl.style.height = this.state.canvasWH.h + "px"
        this.canvasEl.width = this.state.ctxWH.w
        this.canvasEl.height = this.state.ctxWH.h
        this.bodyEl.appendChild(this.canvasEl)
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
