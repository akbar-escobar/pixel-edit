import type { CtxEvent } from "../CtxEvent";
import type { State } from "../State";
import { Brush } from "./Brush";
import { Eraser } from "./Eraser";
// import { Brush } from "./Brush";
// import { Eraser } from "./Eraser";

export class Undo {
    constructor(state: State, ctx: CanvasRenderingContext2D, ctxEvent: CtxEvent) {
        const brush = new Brush(state, ctx)
        const eraser = new Eraser(state, ctx)
        const stroke = state.history.pop()
        if (!stroke) return
        for (let len = stroke.length - 1; len >= 0; len--) {
            ctxEvent.lerpFunc(stroke[len].x, stroke[len].y, (lerp) => {
                if (stroke[len].color !== "") eraser.erase(lerp.x, lerp.y)
                else brush.draw(lerp.x, lerp.y, stroke[len].color)
            })
        }
        ctxEvent.prev = undefined
        ctxEvent.dXY = { x: -1, y: -1 }
        ctxEvent.lerp = { x: -1, y: -1 }
    }
}
