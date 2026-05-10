import type { State } from "./State"

export class CanvasEvent {
    constructor(
        state: State,
        canvasEl: HTMLCanvasElement,
        parentEl: HTMLElement
    ) {
        let isMove = false

        parentEl.addEventListener("mousedown", () => {
            isMove = true
        })

        parentEl.addEventListener("mousemove", (e) => {
            if (isMove && !state.isMouse) {
                canvasEl.style.top = (e.y - state.canvasWH.h / 2) + "px"
                canvasEl.style.left = (e.x - state.canvasWH.w / 2) + "px"
            }
        })

        parentEl.addEventListener("mouseup", () => {
            isMove = false
        })

        let s = 1
        parentEl.addEventListener("wheel", (e) => {
            if (e.deltaY > 0 && s < 2.9) s += 0.03
            if (e.deltaY < 0 && s > 0.2) s -= 0.03
            canvasEl.style.transform = `scale(${s.toFixed(2)})`
        })
    }
}
