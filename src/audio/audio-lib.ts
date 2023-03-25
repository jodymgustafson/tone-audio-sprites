/** Represents an audio sample that can be played */
export type AudioSample = {
    start(): void;
    stop(): void;
}
/**
 * An audio lib is a collection of audio files that are loaded together
 * and can be played individually
 */
export interface AudioLib {
    /**
     * Loads one or more audio files async and reports progress
     * @param fileNames Array of file names
     * @param progress A callback that reports the loading percent complete 
     */
    load(fileNames: string[], progress?: (pct: number) => any): Promise<void>;
    
    /**
     * Starts playback of an audio clip
     * @param name An audio file name
     */
    play(name: string): AudioLib;

    /**
     * Stops playback of an audio clips
     * @param name An audio file name
     */
    stop(name: string): AudioLib;

    /**
     * Gets an audio sample
     * @param name The name of an audio file
     * @returns The sample or undefined if it doesn't exist
     */
    getSample(name: string): AudioSample | undefined;
}