import { SampleSpriteInfo, ToneSampleSpriteLib } from "../tone-sample-sprite-lib";
import { AudioInstrument, normalizeNoteName, NOTE_NAMES } from "../../audio-instrument";

export abstract class BaseInstrument implements AudioInstrument {
    protected readonly lib: ToneSampleSpriteLib;

    constructor(readonly path: string, readonly extensions: string[], spriteInfo: SampleSpriteInfo[]) {
        this.lib = new ToneSampleSpriteLib(this.path, this.extensions, spriteInfo);
    }

    abstract load(progress?: (pct: number) => any): Promise<void>;

    play(note: string): void;
    play(notes: string[], strumDelay?: number): void;
    play(notes: string|string[], strumDelay = 0): void {
        if (typeof notes === "string") {
            notes = [notes];
        }
        notes.forEach((n, i) => {
            setTimeout(() => this.lib.play(normalizeNoteName(n)), strumDelay * i);
        });
    }

    stop(notes: string[]): void;
    stop(note: string): void;
    stop(notes: string|string[]): void {
        if (typeof notes === "string") {
            notes = [notes];
        }
        notes.forEach(n => {
            this.lib.stop(normalizeNoteName(n));
        })
    }
}

export function getSpriteInfo(name: string, minOctave: number, maxOctave: number, duration = 2, spacing = 4): SampleSpriteInfo[] {
    const info: SampleSpriteInfo[] = [];
    for (let octave = minOctave; octave < maxOctave; octave++) {
        for (let n = 0; n < NOTE_NAMES.length; n++) {
            info.push({
                id: NOTE_NAMES[n] + octave,
                fileName: name + octave,
                offset: (n * spacing) + 1,
                duration: duration
            });
        }
    }
    return info;
}
