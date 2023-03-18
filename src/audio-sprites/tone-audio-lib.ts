import { WebAudioLib } from "./web-audio-lib";
import * as Tone from "tone";
import * as analog from "analogging";

/**
 * A web audio lib that uses the Tone module
 */
export class ToneAudioLib extends WebAudioLib {
    protected readonly logger = analog.getLogger("ToneAudioLib");

    /** Maps clip names to players */
    protected readonly players: Record<string, Tone.Player> = {};
    protected readonly extensionString;

    /**
     * @param path Path to the audio files
     * @param extensions Supported audio file extensions in order of preference, e.g. ["ogg", "mp3"]
     */
    constructor(readonly path: string, extensions: string[]) {
        super(extensions);
        this.extensionString = this.extensions.length > 1 ? `.[${this.extensions.join("|")}]` : "." + this.extensions[0];
    }

    protected loadFile(fileName: string): Promise<void> {
        const url = this.getFileUrl(fileName);
        this.logger.debug("Loading", url);

        return new Promise((res, rej) => {
            this.players[fileName] = new Tone.Player({ url, onload: res, onerror: rej } as Tone.PlayerOptions).toDestination()
        });
    }

    protected getFileUrl(fileName: string) {
        return this.path + encodeURIComponent(fileName) + this.extensionString;
    }

    protected getPlayer(name: string): Tone.Player | undefined {
        return this.players[name];
    }

    play(...names: string[]): ToneAudioLib {
        Tone.start().then(() => {
            names.forEach(n => {
                this.logger.debug("Playing", n);
                const player = this.getPlayer(n);
                if (player)
                    player.start();
                else
                    throw new Error("Player not defined: " + n);
            });
        });

        return this;
    }

    stop(...names: string[]): ToneAudioLib {
        names.forEach(n => {
            this.logger.debug("Stopping", n);
            const player = this.getPlayer(n);
            if (player)
                player.stop();
            else
                throw new Error("Player not defined: " + n);
        });

        return this;
    }
}
