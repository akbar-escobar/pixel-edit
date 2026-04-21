import type { State } from "../scripts/State"

export class VertiBar {
    parent: HTMLElement | null
    state: State
    icon: HTMLElement | null
    constructor(state: State) {
        this.parent = null
        this.icon = null
        this.state = state
        this.barParent()
        this.icons()
    }

    barParent() {
        this.parent = document.createElement("div")
        this.parent.style.display = "flex"
        this.parent.style.flexDirection = "column"
        this.parent.style.backgroundColor = "red"
        this.parent.style.height = window.innerHeight + "px"
        this.parent.style.width = this.state.vertiBarH + "px"
        this.parent.style.position = "absolute"

        if (this.state.vertiBarPos === "left") this.parent.style.left = 0 + "px"
        else this.parent.style.right = 0 + "px"

        document.body.appendChild(this.parent)
    }

    icons() {
        const bckg = ["green", "yellow", "blue"] // ex color
        const tools = this.state.tools
        for (let i = 0; i < tools.length; i++) {
            this.iconStyle(bckg[i])
            this.icon?.addEventListener("click", () => {
                this.state.setToolCond(tools[i])
            })
        }
    }

    iconStyle(bckg: string) {
        this.icon = document.createElement("div")
        this.icon.style.backgroundColor = bckg
        this.icon.style.height = this.state.vertiBarH + "px"
        this.icon.style.width = this.state.vertiBarH + "px"

        this.parent?.appendChild(this.icon)
    }
}
