import type { State } from "../State";
import { Eraser } from "./Eraser";

export class Undo {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const lastArr = state.brushStack.pop()
        const erase = new Eraser(state, ctx)

        if (lastArr === undefined) return
        state.setBrushStackCache(lastArr.x, lastArr.y, lastArr.col)
        erase.background(lastArr.x, lastArr.y)
    }
}
