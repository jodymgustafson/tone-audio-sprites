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
     * Starts playback of one or more audio clips
     * @param names One or more audio file names
     */
    play(...names: string[]): AudioLib;

    /**
     * Stops playback of one or more audio clips
     * @param names One or more audio file names
     */
    stop(...names: string[]): AudioLib;
}