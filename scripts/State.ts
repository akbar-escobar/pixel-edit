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
    barWH: typeWH
    barPos: { colorPallet: string, toolsBar: string }
    prevStroke: { x: number, y: number, color: string }
    stroke: { x: number, y: number, color: string }[]
    history: typeof this.stroke[]
    constructor() {
        const winIn = { w: window.innerWidth, h: window.innerHeight }

        this.barWH = { w: 70, h: 45 }
        this.barPos = { colorPallet: "left", toolsBar: "bottom" }

        this.ctxWH = { w: 16, h: 19 }

        this.canvasS = winIn.h < winIn.w ? (winIn.h - this.barWH.h) / this.ctxWH.h : (winIn.w - this.barWH.w) / this.ctxWH.w
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

        this.prevStroke = { x: -1, y: -1, color: "" }
        this.history = []
        this.stroke = []
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

    drawXY(canvasEl: HTMLCanvasElement, eClientX: number, eClientY: number) {
        const rect = canvasEl.getBoundingClientRect()
        const scale = { x: rect.width / canvasEl.offsetWidth, y: rect.height / canvasEl.offsetHeight }
        const canvasRoundX = Math.round((eClientX - rect.x) / scale.x)
        const canvasRoundY = Math.round((eClientY - rect.y) / scale.y)
        const ctxRoundX = Math.round(canvasRoundX / this.canvasS - (this.brushWH.w / 2))
        const ctxRoundY = Math.round(canvasRoundY / this.canvasS - (this.brushWH.h / 2))
        return {
            x: ctxRoundX,
            y: ctxRoundY
        }
    }

    setStroke(x: number, y: number, color: string) {
        if (
            (this.prevStroke.x !== x) ||
            (this.prevStroke.y !== y) ||
            (this.prevStroke.color !== color)
        ) this.stroke.push({ x: x, y: y, color: color })

        this.prevStroke = { x: x, y: y, color: color }
    }

    setHistory() {
        if (this.stroke.length > 0) this.history.push(this.stroke)
        this.stroke = []
        this.prevStroke = { x: -1, y: -1, color: "" }
    }
}

type typeWH = { w: number, h: number }
// type typeXY = { x: number, y: number }

type typeToolCond = "brush" | "eraser" | "pointer"
