import type { State } from "../scripts/State"
import { ColorConverter } from "../scripts/ColorConverter"
import "../Styles.css"

export class PalletManager {
    btn: HTMLInputElement
    parent: HTMLElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    cond: typeCond
    state: State
    colorConverter: ColorConverter
    s: HTMLElement
    palletP: HTMLElement
    pallet: HTMLElement | null
    items: HTMLElement
    newPalletP: HTMLElement
    palletMenuP: HTMLElement
    wh: { w: string, h: string }
    constructor(state: State) {
        this.state = state
        this.btn = document.createElement("input")
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.s = document.createElement("div")
        this.parent = document.createElement("div")
        this.palletP = document.createElement("div")
        this.palletMenuP = document.createElement("div")
        this.newPalletP = document.createElement("div")
        this.pallet = null
        this.items = document.createElement("div")
        this.cond = "visible"
        this.wh = { w: "70%", h: "10%" }

        this.colorConverter = new ColorConverter()
        this.colFunc()
        // this.parentStyle()
        // this.newPalletBtn()
        // this.palletPStyle()
    }

    set(cond: typeCond) {
        this.cond = cond
        this.parentStyle()
        this.newPalletBtn()
        this.palletPStyle()
    }

    parentStyle() {
        this.parent.classList.add("palletManager-parent")
        this.parent.style.visibility = this.cond
        document.body.appendChild(this.parent)
    }

    newPalletBtn() {
        this.btn.type = "file"
        this.btn.accept = "image/*"
        this.btn.style.width = this.wh.w
        this.btn.style.height = this.wh.h
        this.btn.style.backgroundColor = "red"
        this.parent.appendChild(this.btn)

        this.btn.addEventListener("change", () => {
            const file = this.btn.files?.[0]
            const img = new Image()
            if (!file) return
            img.src = URL.createObjectURL(file)
            img.onload = () => {
                if (!this.ctx) return
                this.canvas.width = img.width
                this.canvas.height = img.height
                this.ctx.drawImage(img, 0, 0)
                for (let x = 0; x < this.ctx.canvas.width; x += this.ctx.canvas.height) {
                    const data = this.ctx.getImageData(x, 0, 1, 1).data
                    const { H, S, L } = this.colorConverter.rgbToHsl(data[0], data[1], data[2])
                    if (!H || !S || !L) return
                    console.log(`[${H}, ${S}, ${L}],`)
                    this.newPallet(H, S, L)
                    this.state.setColorPallet(`hsl(${H},${S}%,${L}%)`)
                }
            }
        })
    }

    colFunc() {
        const arr = [
            [309, 16, 17],
            [321, 26, 23],
            [349, 45, 32],
            [3, 37, 45],
            [13, 24, 45],
            [16, 20, 55],
            [21, 21, 63],
            [14, 14, 71],
            [338, 2, 79],
            [2, 16, 34],
            [172, 16, 36],
            [63, 11, 39],
            [99, 18, 49],
            [56, 17, 54],
            [37, 21, 67],
            [159, 17, 30],
            [137, 19, 39],
            [148, 18, 47],
            [80, 18, 46],
            [94, 7, 57],
            [80, 9, 68],
            [305, 22, 36],
            [325, 26, 45],
            [346, 12, 59],
        ]

        for (const hsl of arr) {
            let col = { h: 0, s: 0, l: 0 }
            for (let i = 0; i < hsl.length; i++) {
                if (i === 0) col.h = hsl[i]
                if (i === 1) col.s = hsl[i]
                if (i === 2) col.l = hsl[i]
            }
            const s = this.s.style
            s.color = `hsl(${col.h},${col.s}%,${col.l}%)`
            if (s.color !== '') {
                this.newPallet(col.h, col.s, col.l)
                this.state.setColorPallet(`hsl(${col.h},${col.s}%,${col.l}%)`)
                console.log(`"hsl(${col.h},${col.s}%,${col.l}%)",`)
            }
        }
    }

    palletPStyle() {
        this.palletP.style.display = "flex"
        this.palletP.style.width = this.wh.w
        this.palletP.style.height = this.wh.h
        this.parent.appendChild(this.palletP)

        this.newPalletP.style.display = "flex"
        this.newPalletP.style.flexDirection = "row"
        this.newPalletP.style.width = "100%"
        this.newPalletP.style.height = "100%"
        this.palletP.appendChild(this.newPalletP)

        this.palletMenuP.style.backgroundColor = "yellow"
        this.palletMenuP.style.width = 15 + "%"
        this.palletP.appendChild(this.palletMenuP)
    }

    newPallet(H: number, S: number, L: number) {
        this.pallet = document.createElement("div")
        this.pallet.style.backgroundColor = `hsl(${H},${S}%,${L}%)`
        this.pallet.style.width = 10 + "%"
        this.pallet.style.height = 100 + "%"
        this.newPalletP.appendChild(this.pallet)
    }
}

type typeCond = "hidden" | "visible" 
