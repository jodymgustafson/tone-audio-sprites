import { BaseInstrument, getSpriteInfo } from "./base-instrument";

const audioFiles = [
    "piano4", "piano5"
];

export class PianoInstrument extends BaseInstrument {
    constructor(path: string, extensions: string[]) {
        super(path, extensions, getSpriteInfo("piano", 4, 5))
    }

    load(progress?: (pct: number) => any): Promise<void> {
        return this.lib.load(audioFiles, progress);
    }
}
