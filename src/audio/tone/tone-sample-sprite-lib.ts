import * as Tone from "tone";
import * as analog from "analogging";
import { ToneAudioLib } from "./tone-audio-lib";

export type SampleSpriteInfo = {
    /** Id used to reference the sprite */
    id: string;
    /** Name of the audio file the sprite is in */
    fileName: string;
    /** Offset of the sprite in the file in seconds */
    offset: number;
    /** Duration of the sprite in seconds */
    duration: number;
}

/**
 * This class loads one or more audio files and slices them up into multiple
 * audio samples that can be played independently.
 */
export class ToneSampleSpriteLib extends ToneAudioLib {
    protected readonly logger = analog.getLogger("ToneSampleSpriteLib");

    /**
     * @param path Path to the audio files
     * @param extensions Supported audio file extensions in order of preference, e.g. ["ogg", "mp3"]
     * @param spriteInfo An array of SampleSpriteInfo specifying how to get each sprite
     */
    constructor(readonly path: string, readonly extensions: string[], readonly spriteInfo: SampleSpriteInfo[]) {
        super(path, extensions);
    }

    load(fileNames: string[], progress?: (pct: number) => any): Promise<void> {
        return super.load(fileNames, progress)
            .then(() => {
                // remap the players to the sprites they contain
                this.players = this.sliceSprites();
            });
    }

    private sliceSprites(): Record<string, Tone.Player> {
        const samples: Record<string, Tone.Player> = {};
        for (const info of this.spriteInfo) {
            this.logger.debug("Creating sprite", info.id);
            let start = info.offset as number;
            let end = start + (info.duration as number);
            const sprite = this.getPlayer(info.fileName)!.buffer.slice(start, end);
            samples[info.id] = new Tone.Player(sprite).toDestination();
        }
        return samples;
    }
}