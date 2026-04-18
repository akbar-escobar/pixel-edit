import type { State } from "../State";
import { Brush } from "./Brush";

export class Redo {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const lastArr = state.brushStackCache.pop()

        if (lastArr === undefined) return
        state.setBrushStack(lastArr.x, lastArr.y, lastArr.col)
        new Brush(state, ctx).draw(lastArr.x, lastArr.y)
    }
}
