import type { State } from "../State";
import { Brush } from "./Brush";
import { Eraser } from "./Eraser";

export class Redo {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const stack = state.drawStackCache.pop()
        if (!stack) return
        state.setDrawStack(stack.x, stack.y, stack.col)

        if (stack.col === "")
            new Brush(state, ctx).draw(stack.x, stack.y, stack.col)
        else new Eraser(state, ctx).erase(stack.x, stack.y)
    }
}
