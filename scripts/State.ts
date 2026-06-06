export class State {
    ctxWH: typeWH
    canvasWH: typeWH
    canvasS: number
    canvasBackColA: string
    canvasBackColB: string
    colorPickerWH: typeWH
    tools: typeToolCond[]
    toolCond: typeToolCond
    brushWH: typeWH
    brushCol: string
    colorPallet: string[]
    background: string
    barSize: number
    barPos: { colorPallet: string, toolsBar: string }
    historyXY: { x: number, y: number, color: string }[]
    // drawXY: { x: number, y: number, color: string | "" }
    constructor() {
        const winIn = { w: window.innerWidth, h: window.innerHeight }

        this.barSize = 70
        this.barPos = { colorPallet: "left", toolsBar: "bottom" }

        this.ctxWH = { w: 16, h: 19 }

        this.canvasS = winIn.h < winIn.w ? (winIn.h - this.barSize) / this.ctxWH.h : (winIn.w - this.barSize) / this.ctxWH.w
        this.canvasWH = { w: this.ctxWH.w * this.canvasS, h: this.ctxWH.h * this.canvasS }
        this.canvasBackColA = "white"
        this.canvasBackColB = "#d3d3d3"

        this.background = "#333333"

        this.colorPickerWH = { w: 500, h: 650 }

        this.tools = ["brush", "eraser", "pointer"]
        this.toolCond = "brush"
        this.brushWH = { w: 1, h: 1 }
        this.brushCol = "rgb(0, 0, 0)"
        this.colorPallet = [
            "hsl(0,25%,25%)"
        ]

        this.historyXY = []
    }

    setBrushCol(col: string) {
        this.brushCol = col
    }

    setToolCond(cond: typeToolCond) {
        this.toolCond = cond
    }

    setColorPallet(col: string) {
        this.colorPallet.push(col)
    }

    canvasDrawXY(canvasEl: HTMLCanvasElement, eClientX: number, eClientY: number) {
        const rect = canvasEl.getBoundingClientRect()
        const scale = { x: rect.width / canvasEl.offsetWidth, y: rect.height / canvasEl.offsetHeight }
        const roundX = Math.round((eClientX - rect.x) / scale.x)
        const roundY = Math.round((eClientY - rect.y) / scale.y)
        return {
            x: roundX,
            y: roundY
        }
    }

    ctxDrawXY(x: number, y: number) {
        const roundX = Math.round(x / this.canvasS - (this.brushWH.w / 2))
        const roundY = Math.round(y / this.canvasS - (this.brushWH.h / 2))
        return {
            x: roundX,
            y: roundY
        }
    }

    setHistoryXY(x: number, y: number, color: string) {
        this.historyXY.push({ x: x, y: y, color: color })
    }
}

type typeWH = { w: number, h: number }
type typeXY = { x: number, y: number }

type typeToolCond = "brush" | "eraser" | "pointer"
