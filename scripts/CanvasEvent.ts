import { State } from "./State"

export class CanvasEvent {
    isMove: boolean
    type: { start: string, move: string, end: string }
    canvasEl: HTMLCanvasElement
    state: State
    parent: HTMLDivElement
    constructor(
        state: State,
        canvasEl: HTMLCanvasElement,
        parent: HTMLDivElement
    ) {
        this.state = state
        this.canvasEl = canvasEl
        this.parent = parent
        this.isMove = false
        this.type = { start: "", move: "", end: "" }
        this.event()
    }

    event() {
        let se0: { x: number, y: number }
        let se1: { x: number, y: number }
        let el: DOMRect
        let scale = 1
        this.parent.addEventListener("touchstart", (e) => {
            el = this.canvasEl.getBoundingClientRect()
            se0 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
            if (e.touches[1]) se1 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
        })

        this.parent.addEventListener("touchmove", (e) => {
            e.preventDefault()
            const me0 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
            this.canvasEl.style.left = el.x + (
                me0.x - se0.x
            ) + "px"
            this.canvasEl.style.top = el.y + (
                me0.y - se0.y
            ) + "px"

            if (e.touches[1]) {
                const me1 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
                const d = { x: me1.x - se1.x, y: me1.y - se1.y }
                const dXY = d.x - d.y
                if (dXY > 0 && scale < 2) scale += 0.01
                if (dXY < 0 && scale > 0.1) scale -= 0.01
                this.canvasEl.style.scale = `${scale}`
            }

        })
    }
}
