import type { State } from "../State";
// import { Brush } from "./Brush";
// import { Eraser } from "./Eraser";

export class Undo {
    constructor(state: State, ctx: CanvasRenderingContext2D) {
        const stack = state.drawStack.pop()
        // const stackB = state.drawStack[state.drawStack.length - 1]
        if (!stack && ctx) return // TODO just for place
        // state.setDrawStackCache(stack.x, stack.y, stack.col)

        console.log("Undo")
    }
}
