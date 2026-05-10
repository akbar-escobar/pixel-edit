export class ColorConverter {
    constructor() { }

    rgbToHsl(r: number, g: number, b: number) {
        const norm = { r: r / 255, g: g / 255, b: b / 255 }
        const max = Math.max(norm.r, norm.g, norm.b)
        const min = Math.min(norm.r, norm.g, norm.b)
        const delta = max - min

        let H, S, L

        L = ((max + min) / 2)

        if (max === min) S = 0
        else if (L < 0.5) S = delta / (max + min)
        else if (L >= 0.5) S = delta / (2 - max + min)

        if (max === norm.r) H = 60 * (((norm.g - norm.b) / delta) % 6)
        else if (max === norm.g) H = 60 * (((norm.b - norm.r) / delta) + 2)
        else if (max === norm.b) H = 60 * (((norm.r - norm.g) / delta) + 2)


        if (H! < 0) H! += 360
        S! *= 100
        L *= 100

        // H = Math.round(H!)
        // S = Math.round(S!)
        // L = Math.round(L)
        return { H, S, L }
    }
}

// const rgbEx = [
//            [50, 36, 48, 255],
//            [74, 43, 63, 255],
//            [120, 45, 59, 255]
//        ]
