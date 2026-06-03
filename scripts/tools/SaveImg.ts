import { State } from "../State"
import { Brush } from "./Brush"
import { Eraser } from "./Eraser"

export class SaveImg {
    constructor(state: State) {
        const cacheCanvas = document.createElement("canvas")
        const cacheCtx = cacheCanvas.getContext("2d")
        cacheCanvas.width = state.ctxWH.w
        cacheCanvas.height = state.ctxWH.h

        if (!cacheCtx) return
        const brush = new Brush(state, cacheCtx)
        const eraser = new Eraser(state, cacheCtx)

        for (const history of state.historyXY) {
            brush.draw(history.x, history.y, history.color, false)
            if (history.color === "") eraser.erase(history.x, history.y, false)
        }

        cacheCanvas.toBlob((blob) => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${Date.now()}.png`
            link.click()
        })
    }
}
