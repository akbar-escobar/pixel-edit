export class State {
    ctxWH: typeWH

    canvasWH: typeWH
    canvasXY: typeXY
    canvasS: number
    canvasBackColA: string
    canvasBackColB: string
    canvasMouseMoveXY: typeXY

    mouseBool: boolean

    toolsWH: typeWH
    toolsXY: typeXY
    toolsOptWH: typeWH
    toolsOptXY: typeXY
    toolsBackCol: string

    toolCond: typeToolCond
    toolOptCond: typeToolOptCond

    brushWH: typeWH
    constructor() {
        const winIn = { w: window.innerWidth, h: window.innerHeight }

        this.ctxWH = { w: 16, h: 16 }

        this.canvasS = 30
        this.canvasWH = { w: this.ctxWH.w * this.canvasS, h: this.ctxWH.h * this.canvasS }
        this.canvasXY = { x: winIn.w / 2 - this.canvasWH.w / 2, y: winIn.h / 2 - this.canvasWH.h / 2 }
        this.canvasBackColA = "white"
        this.canvasBackColB = "#d3d3d3"
        this.canvasMouseMoveXY = { x: -1, y: -1 }

        this.mouseBool = false

        this.toolsWH = { w: winIn.w * 0.05, h: winIn.h }
        this.toolsXY = { x: 0, y: 0 }
        this.toolsOptWH = { w: winIn.w, h: winIn.h * 0.05 }
        this.toolsOptXY = { x: this.toolsWH.w, y: winIn.h - this.toolsOptWH.h }
        this.toolsBackCol = "#eeeeee"

        this.toolCond = "brush"
        this.toolOptCond = ""

        this.brushWH = { w: 1, h: 1 }
    }

    setCanvasMouseMoveXY(x: number, y: number) {
        const { mathX, mathY } = this.returnMathRoundXY(x, y)
        this.canvasMouseMoveXY = { x: mathX, y: mathY }
    }

    setToolCond(cond: typeToolCond) {
        this.toolCond = cond
    }

    returnMathRoundXY(x: number, y: number) {
        return {
            mathX: Math.round(x / this.canvasS - (this.brushWH.w / 2)),
            mathY: Math.round(y / this.canvasS - (this.brushWH.h / 2))
        }
    }
}

type typeWH = { w: number, h: number }
type typeXY = { x: number, y: number }
type typeToolCond = "brush" | "erase"
type typeToolOptCond = "" | "undo" | "redo" | "brushOpt"
