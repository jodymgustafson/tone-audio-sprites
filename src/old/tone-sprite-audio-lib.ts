import { AudioLib } from "./old/audio-lib";
import { ToneAudioLib } from "./tone-audio-lib";
import * as Tone from "tone";
import * as analog from "analogging";

/**
 * A tuple that defines the name of an audio clip, and offset and duration of a sound sprite in the clip
 * e.g. { clip: "guitar4", offset: "8s", duration: "4s" }
 */
export type SoundSprite = {
    /** Name of the audio clip the sprite is in */
    clip: string;
    /** Offset of the sprite in the clip */
    offset: Tone.Unit.Time;
    /** Duration of the sprite */
    duration: Tone.Unit.Time;
};

/**
 * Defines a sound sprite map where the key is the sound name and value is a SoundSprite
 * e.g. { "c": { clip: "guitar4", offset: "0s", duration: "4s" }, "c#": { clip: "guitar4", offset: "4s", duration: "4s" } }
 */
export type SoundSpriteMap = {
    [key: string]: SoundSprite
};

export class ToneSpriteAudioLib extends ToneAudioLib {
    protected readonly logger = analog.getLogger("ToneSpriteAudioLib");

    constructor(path: string, extensions: string[], readonly spriteMap: SoundSpriteMap) {
        super(path, extensions);
    }

    play(...names: string[]): AudioLib {
        Tone.start().then(() => {
            names.forEach(n => {
                const sprite = this.spriteMap[n];
                this.logger.debug("Playing ", sprite);
                const player = this.players[sprite.clip];
                if (player)
                    player.start(0, sprite.offset, sprite.duration);
                else
                    throw new Error("Player not defined: " + n);
            });
        });

        return this;
    }

    stop(...names: string[]): AudioLib {
        names.forEach(n => {
            this.logger.debug("Stopping ", n);
            const sprite = this.spriteMap[n];
        const player = this.players[sprite.clip];
            if (player)
                player.stop();
            else
                throw new Error("Player not defined: " + n);
        });

        return this;
    }
}

// const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// /**
//  * 
//  * @param note Format: "{note},{octave}"
//  * @returns [{player-name}, {offset}]
//  */
// function parseName(note: string): [string, string] {
//     const parts = note.split(",");
//     return [parts[1], (NOTE_NAMES.indexOf(parts[0])! * 4) + "s"];
// }
