import { AudioSprite, AudioSpriteClipMap } from "./audio-sprite";
import * as Tone from "tone";

/**
 * An audio sprite that uses the Tone module
 */
export class ToneAudioSprite implements AudioSprite {
    /**
     * 
     * @param player The Tone player containing the audio file data
     * @param clipMap Defines the clip names and where they are in the audio sprite
     */
    constructor(readonly player: Tone.Player, readonly clipMap: AudioSpriteClipMap) {}

    play(name: string): void {
        const clipInfo = this.clipMap[name];
        if (clipInfo) {
            Tone.start().then(() => {
                this.player.start(0, clipInfo.offset, clipInfo.duration);
            });
        }
        else {
            throw new Error("Unknown clip name: " + name);
        }
    }
    
    stop(name: string): void {
        const clipInfo = this.clipMap[name];
        if (clipInfo) {
            this.player.stop();
        }
        else {
            throw new Error("Unknown clip name: " + name);
        }
    }
}