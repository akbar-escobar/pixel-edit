export class State {
    ctxWH: typeWH
    canvasWH: typeWH
    canvasXY: typeXY
    canvasS: number
    canvasBackColA: string
    canvasBackColB: string
    drawMoveXY: typeXY
    colorPickerWH: typeWH
    tools: typeToolCond[]
    toolCond: typeToolCond
    isMouse: boolean
    brushWH: typeWH
    brushCol: string
    drawStack: typeStack[]
    drawStackCache: typeStack[]
    colorMenuCond: typeColorMenuCond
    colorPallet: string[]
    background: string
    barSize: number
    barPos: { colorPallet: string, toolsBar: string }
    constructor() {
        const winIn = { w: window.innerWidth, h: window.innerHeight }

        this.ctxWH = { w: 16, h: 16 }

        this.canvasS = 30
        this.canvasWH = { w: this.ctxWH.w * this.canvasS, h: this.ctxWH.h * this.canvasS }
        this.canvasXY = { x: winIn.w / 2 - this.canvasWH.w / 2, y: winIn.h / 2 - this.canvasWH.h / 2 }
        this.canvasBackColA = "white"
        this.canvasBackColB = "#d3d3d3"
        this.drawMoveXY = { x: -1, y: -1 }

        this.background = "#333333"

        this.barSize = 100
        this.barPos = { colorPallet: "left", toolsBar: "bottom" }

        this.colorPickerWH = { w: 500, h: 650 }

        this.tools = ["brush", "eraser", "pointer"]
        this.toolCond = "brush"
        this.isMouse = false
        this.brushWH = { w: 1, h: 1 }
        this.brushCol = "rgb(0, 0, 0)"
        this.drawStack = []
        this.drawStackCache = []
        this.colorMenuCond = "colorPicker"
        this.colorPallet = [
            "hsl(309,16%,17%)",
            "hsl(321,26%,23%)",
            "hsl(349,45%,32%)",
            "hsl(3,37%,45%)",
            "hsl(13,24%,45%)",
            "hsl(16,20%,55%)",
            "hsl(21,21%,63%)",
            "hsl(14,14%,71%)",
            "hsl(338,2%,79%)",
            "hsl(2,16%,34%)",
            "hsl(172,16%,36%)",
            "hsl(63,11%,39%)",
            "hsl(99,18%,49%)",
            "hsl(56,17%,54%)",
            "hsl(37,21%,67%)",
            "hsl(159,17%,30%)",
            "hsl(137,19%,39%)",
            "hsl(148,18%,47%)",
            "hsl(80,18%,46%)",
            "hsl(94,7%,57%)",
            "hsl(80,9%,68%)",
            "hsl(305,22%,36%)",
            "hsl(325,26%,45%)",
            "hsl(346,12%,59%)"
        ]
    }

    setDrawMoveXY(x: number, y: number) {
        this.drawMoveXY = {
            x: Math.round(x / this.canvasS - (this.brushWH.w / 2)),
            y: Math.round(y / this.canvasS - (this.brushWH.h / 2))
        }
    }

    setBrushCol(col: string) {
        this.brushCol = col
    }

    setDrawStack(
        x: number,
        y: number,
        col: string,
    ) {
        const stack = this.drawStack
        if (stack.length === 0) stack.push({ x: x, y: y, col: col })
        if (
            stack[stack.length - 1].x !== x ||
            stack[stack.length - 1].y !== y ||
            stack[stack.length - 1].col !== col
        ) stack.push({ x: x, y: y, col: col })
    }

    // setDrawStackCache(
    //     x: number,
    //     y: number,
    //     col: string,
    // ) {
    //     this.drawStackCache.push({ x: x, y: y, col: col })
    // }

    setToolCond(cond: typeToolCond) {
        this.toolCond = cond
    }

    setColorMenuCond(cond: typeColorMenuCond) {
        this.colorMenuCond = cond
    }

    setColorPallet(col: string) {
        this.colorPallet.push(col)
    }
}

type typeWH = { w: number, h: number }
type typeXY = { x: number, y: number }

type typeStack = { x: number, y: number, col: string }

type typeToolCond = "brush" | "eraser" | "pointer"
type typeColorMenuCond = "colorPicker" | "colorPallet"
