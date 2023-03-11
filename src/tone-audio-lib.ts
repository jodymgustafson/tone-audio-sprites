import { AudioLib } from "./audio-lib";
import { WebAudioLib } from "./web-audio-lib";
import * as Tone from "tone";
import * as analog from "analogging";

/**
 * A web audio lib that uses the Tone module
 */
export class ToneAudioLib extends WebAudioLib {
    protected readonly logger = analog.getLogger("ToneAudioLib");

    /** Maps clip names to players */
    protected players: Record<string, Tone.Player> = {};
    private extensionString;

    /**
     * @param path Path to the audio files
     * @param extensions Supported audio file extensions in order of preference, e.g. ["ogg", "mp3"]
     */
    constructor(readonly path: string, extensions: string[]) {
        super(extensions);
        this.extensionString = this.extensions.length > 1 ? `.[${this.extensions.join("|")}]` : "." + this.extensions[0];
    }

    protected loadFile(fileName: string): Promise<void> {
        const url = this.path + encodeURIComponent(fileName) + this.extensionString;
        this.logger.debug("Loading", url);

        return new Promise((res, rej) => {
            this.players[fileName] = new Tone.Player({ url, onload: res, onerror: rej } as Tone.PlayerOptions).toDestination()
        });
    }

    play(...names: string[]): AudioLib {
        Tone.start().then(() => {
            names.forEach(n => {
                this.logger.debug("Playing", n);
                const player = this.players[n];
                if (player)
                    player.start();
                else
                    throw new Error("Player not defined: " + n);
            });
        });

        return this;
    }

    stop(...names: string[]): AudioLib {
        names.forEach(n => {
            this.logger.debug("Stopping", n);
            const player = this.players[n];
            if (player)
                player.stop();
            else
                throw new Error("Player not defined: " + n);
        });

        return this;
    }
}
