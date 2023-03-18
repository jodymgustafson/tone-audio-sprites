import { ToneAudioLib } from "./tone-audio-lib";
import * as analog from "analogging";
import * as Tone from "tone";

/**
 * A tuple that defines the name of an audio file, and offset and duration of a sound sprite in the file
 * e.g. { clip: "guitar4", offset: "8s", duration: "4s" }
 */
export type ToneSpriteInfo = {
    /** Name of the audio file the sprite is in */
    fileName: string;
    /** Offset of the sprite in the file */
    offset: Tone.Unit.Time;
    /** Duration of the sprite */
    duration: Tone.Unit.Time;
};

type ToneAudioSprite = {
    player: Tone.Player;
    /** Offset of the sprite in the file */
    offset: Tone.Unit.Time;
    /** Duration of the sprite */
    duration: Tone.Unit.Time;
};

/**
 * Defines a audio sprite map where the key is the audio file name and value is a AudioSpriteInfo
 * e.g. { "c4": { fileName: "guitar4", offset: "0s", duration: "4s" }, "c#4": { fileName: "guitar4", offset: "4s", duration: "4s" } }
 */
export type AudioSpriteInfoMap = {
    [key: string]: ToneSpriteInfo
};

export class ToneAudioSpriteLib extends ToneAudioLib {
    protected readonly logger = analog.getLogger("ToneAudioSpriteLib");
    private readonly sprites: Record<string, Tone.Player> = {};

    constructor(readonly path: string, readonly extensions: string[], readonly spriteInfoMap: AudioSpriteInfoMap) {
        super(path, extensions);
    }

    load(fileNames: string[], progress?: (pct: number) => any): Promise<void> {
        return super.load(fileNames, progress).then(() => {
            for (const i in this.spriteInfoMap) {
                const info = this.spriteInfoMap[i];
                this.logger.debug("Creating sprite", i);
                this.sprites[i] = new Tone.Player(this.players[info.fileName].buffer).toDestination()
            }
        });
    }

    play(...names: string[]): ToneAudioSpriteLib {
        names.forEach(n => {
            this.playSprite(n);    
        });

        return this;
    }

    stop(...names: string[]): ToneAudioSpriteLib {
        names.forEach(n => {
            this.stopSprite(n);    
        });

        return this;
    }

    private playSprite(spriteName: string): void {
        const spriteInfo = this.spriteInfoMap[spriteName];
        if (spriteInfo) {
            const player = this.sprites[spriteName];//this.getPlayer(spriteInfo.fileName);
            if (player) {
                this.logger.debug("Playing", spriteName, "in", spriteInfo.fileName);
                player.start(0, spriteInfo.offset, spriteInfo.duration);    
            }
            else {
                throw new Error("Player not found: " + spriteInfo.fileName);
            }
        }
        else {
            throw new Error("Sprite not found: " + spriteName);
        }
    }

    private stopSprite(spriteName: string): void {
        const spriteInfo = this.spriteInfoMap[spriteName];
        if (spriteInfo) {
            const player = this.getPlayer(spriteInfo.fileName);
            if (player) {
                this.logger.debug("Stopping", spriteName, "in", spriteInfo.fileName);
                player.stop();    
            }
            else {
                throw new Error("Player not found: " + spriteInfo.fileName);
            }
        }
        else {
            throw new Error("Sprite not found: " + spriteName);
        }
    }
}