import { AudioLib, AudioSample } from "./audio-lib";

/**
 * A base class for Web Audio audio libs
 */
export abstract class WebAudioLib implements AudioLib {
    private _isLoaded = false;
    /** Returns true if the audio has been loaded */
    get isLoaded() { return this._isLoaded; }

    /**
     * @param extensions Supported audio file extensions in order of preference, e.g. ["ogg", "mp3"]
     */
    constructor(readonly extensions: string[]) {
    }

    /** See interface */
    load(fileNames: string[], progress: ((pct: number) => any) = () => undefined): Promise<void> {
        const count = fileNames.length;
        let loadCount = 0;
        this._isLoaded = false;

        return new Promise<void>((resolve, reject) => {
            fileNames.forEach(n => this.loadFile(n)
                .then(() => {
                    progress(++loadCount / count);
                    if (loadCount === count) {
                        this._isLoaded = true;
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
    abstract play(name: string): AudioLib;

    /** See interface */
    abstract stop(name: string): AudioLib;

    /** See interface */
    abstract getSample(name: string): AudioSample | undefined;
}