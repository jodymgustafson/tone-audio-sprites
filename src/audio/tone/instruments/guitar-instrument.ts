import { BaseInstrument, getSpriteInfo } from "./base-instrument";

const audioFiles = [
    "guitar4", "guitar5"
];

export class GuitarInstrument extends BaseInstrument {
    constructor(path: string, extensions: string[]) {
        super(path, extensions, getSpriteInfo("guitar", 4, 5))
    }

    load(progress?: (pct: number) => any): Promise<void> {
        return this.lib.load(audioFiles, progress);
    }
}
