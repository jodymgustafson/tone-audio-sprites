import { SoundSpriteMap, ToneSpriteAudioLib } from "./tone-sprite-audio-lib";

const audioFiles = [
    "piano4", "piano5", "piano6"
];

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const spriteMap: SoundSpriteMap = {};

for (let i = 4; i < 7; i++) {
    for (let n = 0; n < NOTE_NAMES.length; n++) {
        spriteMap[NOTE_NAMES[n] + i] = {
            clip: "piano" + i, 
            offset: (n * 4) + "s",
            duration: "4s"
        };
    }
}

export class PianoAudioLib {
    private audioLib: ToneSpriteAudioLib;

    constructor(path: string, extensions: string[]) {
        this.audioLib = new ToneSpriteAudioLib(path, extensions, spriteMap);
    }

    async load(progress?: (pct: number) => any): Promise<void> {
        return this.audioLib.load(audioFiles, progress);
    }

    play(...names: string[]): PianoAudioLib {
        this.audioLib.play(...names);
        return this;
    }

    stop(...names: string[]): PianoAudioLib {
        this.audioLib.stop(...names);
        return this;
    }
}