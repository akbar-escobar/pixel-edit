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

    tools: typeToolCond[]
    toolCond: typeToolCond
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

        this.horiBarW = 50
        this.horiBarPos = "left"
        this.vertiBarH = 30
        this.vertiBarPos = "bottom"

        this.tools = ["brush", "eraser"]
        this.toolCond = "brush"

        this.brushWH = { w: 1, h: 1 }
    }

    setCanvasMouseMoveXY(x: number, y: number) {
        this.canvasMouseMoveXY = {
            x: Math.round(x / this.canvasS - (this.brushWH.w / 2)),
            y: Math.round(y / this.canvasS - (this.brushWH.h / 2))
        }
    }

    setToolCond(cond: typeToolCond) {
        this.toolCond = cond
    }
}

type typeWH = { w: number, h: number }
type typeXY = { x: number, y: number }
type typeToolCond = "brush" | "eraser"
type typeHoriBarPos = "left" | "right"
type typeVertiBarPos = "top" | "bottom"
