import type { State } from "../State";
import { Eraser } from "./Eraser";

export class Undo {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const lastArr = state.brushStack.pop()
        const erase = new Eraser(state, ctx)

        if (lastArr === undefined) return
        state.setBrushStackCache({ x: lastArr.x, y: lastArr.y, col: lastArr.col })
        erase.background(lastArr.x, lastArr.y)
    }
}
