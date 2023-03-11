
/**
 * Defines the offset and duration of a clip in an audio sprite
 * e.g. { offset: 8000, duration: 4000 }
 */
export type AudioSpriteClip = {
    /** Offset of the sprite in the clip in ms */
    offset: number;
    /** Duration of the sprite in ms */
    duration: number;
};

/**
 * Defines a map where the key is the sound name and value is an AudioSpriteInfo
 * e.g. { "c": { clip: "guitar4", offset: "0s", duration: "4s" }, "c#": { clip: "guitar4", offset: "4s", duration: "4s" } }
 */
export type AudioSpriteMap = {
    [key: string]: AudioSpriteClip
};

/**
 * An audio sprite is a single audio file that contains multiple audio clips
 */
export interface AudioSprite {
    /**
     * Starts playback of one or more audio clips
     * @param name Name of audio clip to play
     */
    play(name: string): void;

    /**
     * Stops playback of one or more audio clips
     * @param name Name of audio clip to stop
     */
    stop(name: string): void;    
}