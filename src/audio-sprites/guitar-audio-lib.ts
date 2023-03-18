import { AudioSpriteInfoMap, ToneAudioSpriteLib } from "./tone-audio-sprite-lib";

const audioFiles = [
    "guitar4", "guitar5"
];

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

let _spriteMap: AudioSpriteInfoMap;

function getSpriteMap(): AudioSpriteInfoMap {
    if (!_spriteMap) {
        _spriteMap = {};
        for (let i = 4; i < 6; i++) {
            for (let n = 0; n < NOTE_NAMES.length; n++) {
                _spriteMap[NOTE_NAMES[n] + i] = {
                    fileName: "guitar" + i,
                    offset: ((n * 4) + 1) + "s",
                    duration: "2s"
                };
            }
        }
    }
    return _spriteMap;
}

export class GuitarAudioLib {
    private audioLib: ToneAudioSpriteLib;

    constructor(path: string, extensions: string[]) {
        this.audioLib = new ToneAudioSpriteLib(path, extensions, getSpriteMap());
    }

    load(progress: ((pct: number) => any) = () => undefined): Promise<void> {
        return this.audioLib.load(audioFiles, progress);
    }

    play(...names: string[]): ToneAudioSpriteLib {
        return this.audioLib.play(...names);
    }

    stop(...names: string[]): ToneAudioSpriteLib {
        return this.audioLib.stop(...names);
    }
}