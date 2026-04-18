export class State {
    ctxWH: typeWH

    canvasWH: typeWH
    canvasXY: typeXY
    canvasS: number
    canvasBackColA: string
    canvasBackColB: string
    canvasMouseMoveXY: typeXY

    horiBarW: number
    horiBarPos: typeHoriBarPos
    vertiBarH: number
    vertiBarPos: typeVertiBarPos

    colorPickerWH: typeWH

    tools: typeToolCond[]
    toolCond: typeToolCond
    brushWH: typeWH
    brushCol: string
    brushStack: { x: number, y: number, col: string }[]
    brushStackCache: { x: number, y: number, col: string }[]
    constructor() {
        const winIn = { w: window.innerWidth, h: window.innerHeight }

        this.ctxWH = { w: 16, h: 16 }

        this.canvasS = 30
        this.canvasWH = { w: this.ctxWH.w * this.canvasS, h: this.ctxWH.h * this.canvasS }
        this.canvasXY = { x: winIn.w / 2 - this.canvasWH.w / 2, y: winIn.h / 2 - this.canvasWH.h / 2 }
        this.canvasBackColA = "white"
        this.canvasBackColB = "#d3d3d3"
        this.canvasMouseMoveXY = { x: -1, y: -1 }

        this.horiBarW = 50
        this.horiBarPos = "bottom"
        this.vertiBarH = 50
        this.vertiBarPos = "left"

        this.colorPickerWH = { w: 500, h: 500 }

        this.tools = ["brush", "eraser"]
        this.toolCond = "brush"

        this.brushWH = { w: 1, h: 1 }
        this.brushCol = "rgb(0, 0, 0)"
        this.brushStack = []
        this.brushStackCache = []
    }

    setCanvasMouseMoveXY(x: number, y: number) {
        this.canvasMouseMoveXY = {
            x: Math.round(x / this.canvasS - (this.brushWH.w / 2)),
            y: Math.round(y / this.canvasS - (this.brushWH.h / 2))
        }
    }

    setBrushCol(col: string) {
        this.brushCol = `rgb${col}`
    }

    setBrushStack(x: number, y: number, col: string) {
        const stack = this.brushStack
        if (stack.length === 0) stack.push({ x: x, y: y, col: col })
        if (
            (
                stack[stack.length - 1].x !== x ||
                stack[stack.length - 1].y !== y
            ) ||
            stack[stack.length - 1].col !== col
        ) stack.push({ x: x, y: y, col: col })
    }

    setBrushStackCache(x: number, y: number, col: string) {
        this.brushStackCache.push({ x: x, y: y, col: col })
        console.log(this.brushStackCache)
    }

    setToolCond(cond: typeToolCond) {
        this.toolCond = cond
    }
}

type typeWH = { w: number, h: number }
type typeXY = { x: number, y: number }
type typeToolCond = "brush" | "eraser"
type typeVertiBarPos = "left" | "right"
type typeHoriBarPos = "top" | "bottom"
