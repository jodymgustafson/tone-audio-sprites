import { AudioLib } from "./audio-lib";

/**
 * An audio lib for Web Audio
 */
export abstract class WebAudioLib implements AudioLib {
    /**
     * @param extensions Supported audio file extensions in order of preference, e.g. ["ogg", "mp3"]
     */
    constructor(readonly extensions: string[]) {
    }

    /** See interface */
    load(fileNames: string[], progress: ((pct: number) => any) = () => undefined): Promise<void> {
        const count = fileNames.length;
        let loadCount = 0;

        return new Promise<void>((resolve, reject) => {
            fileNames.forEach(n => this.loadFile(n)
                .then(() => {
                    progress(loadCount / count);
                    if (++loadCount === count) {
                        resolve();
                    }
                })
                .catch(err => {
                    reject(err);
                })
            );
        });
    }

    /**
     * Loads one file async
     * @param fileName File name without the extension
     */
    protected abstract loadFile(fileName: string): Promise<void>;

    /** See interface */
    abstract play(...names: string[]): AudioLib;

    /** See interface */
    abstract stop(...names: string[]): AudioLib;
}