import type { State } from "../scripts/State";
import { PalletManager } from "./PalletManager";

export class ColorPallet {
    parent: HTMLElement
    palletP: HTMLElement
    settingsP: HTMLElement
    state: State
    icon: HTMLElement | null
    col: string
    iconS: number
    isAddCol: boolean
    palletManager: PalletManager
    constructor(state: State, palletManager: PalletManager) {
        this.state = state
        this.palletManager = palletManager
        this.parent = document.createElement("div")
        this.palletP = document.createElement("div")
        this.settingsP = document.createElement("div")
        this.icon = null
        this.iconS = 90
        this.col = this.state.brushCol
        this.isAddCol = false

        this.parentStyle()
        this.palletPStyle()
        this.settingsPStyle()
        this.icons()
    }

    parentStyle() {
        this.parent.style.height = window.innerHeight + "px"
        this.parent.style.width = this.state.barSize + "px"
        this.parent.style.position = "absolute"
        this.parent.style.backgroundColor = this.state.background

        if (this.state.barPos.colorPallet === "left") this.parent.style.left = 0 + "px"
        else this.parent.style.right = 0 + "px"

        document.body.appendChild(this.parent)
    }

    palletPStyle() {
        // this.palletP.style.display = "flex"
        this.palletP.style.height = window.innerHeight - this.state.barSize + "px"
        this.palletP.style.overflowY = "auto"
        this.parent.appendChild(this.palletP)
    }

    settingsPStyle() {
        this.settingsP.style.position = "absolute"
        this.settingsP.style.bottom = 0 + "px"
        this.settingsP.style.width = 100 + "%"
        this.settingsP.style.height = this.state.barSize + "px"
        this.settingsP.style.backgroundColor = "red"
        this.parent.appendChild(this.settingsP)

        let isClick = false
        this.settingsP.addEventListener("click", () => {
            isClick ?
                this.palletManager.set("visible") :
                this.palletManager.set("hidden")

            isClick = !isClick
        })
    }

    setCol(col: string) {
        this.col = col
        this.isAddCol = true
    }

    icons() {
        let colArr = []
        for (let i = 0; i < this.state.colorPallet.length; i++) {
            this.icon = document.createElement("div")
            this.icon.style.backgroundColor = this.state.colorPallet[i]
            this.icon.style.marginBottom = 10 + "px"
            this.icon.style.border = "2px solid white"
            this.icon.style.width = this.iconS + "%"
            this.icon.style.height = this.iconS + "px"
            colArr.push({ i: i, col: this.state.colorPallet[i] })
            this.palletP.appendChild(this.icon)

            const icon = this.icon
            this.icon.addEventListener("click", () => {
                if (this.isAddCol) {
                    for (const color of colArr) {
                        if (color.i === i) colArr[i].col = this.col
                    }
                    icon.style.backgroundColor = this.col
                    this.isAddCol = false
                }
                this.state.setBrushCol(colArr[i].col)
            })
        }
    }
}

