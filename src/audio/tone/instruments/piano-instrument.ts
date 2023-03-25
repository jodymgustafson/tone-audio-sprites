import { BaseInstrument, getSpriteInfo } from "./base-instrument";

const audioFiles = [
    "piano4", "piano5"
];

export class PianoInstrument extends BaseInstrument {
    constructor(readonly path: string, readonly extensions: string[]) {
        super(path, extensions, getSpriteInfo("piano", 4, 6))
    }

    load(progress?: (pct: number) => any): Promise<void> {
        return this.lib.load(audioFiles, progress);
    }
}
