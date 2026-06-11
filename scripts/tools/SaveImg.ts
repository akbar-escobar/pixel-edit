import { State } from "../State"
// import { Brush } from "./Brush"
// import { Eraser } from "./Eraser"

export class SaveImg {
    constructor(state: State) {
        const cacheCanvas = document.createElement("canvas")
        const cacheCtx = cacheCanvas.getContext("2d")
        cacheCanvas.width = state.ctxWH.w
        cacheCanvas.height = state.ctxWH.h

        if (!cacheCtx) return
        // const brush = new Brush(state, cacheCtx)
        // const eraser = new Eraser(state, cacheCtx)

        // TODO make it work using lerppppp
        // for (const history of state.history) {
        //     brush.draw(history.x, history.y)
        //     if (history.color === "") eraser.erase(history.x, history.y, false)
        // }

        const link = document.createElement("a")
        link.href = cacheCanvas.toDataURL("image/png")
        link.download = `${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
    }
}
