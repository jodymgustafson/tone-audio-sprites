import { WebAudioLib } from "../web-audio-lib";
import * as Tone from "tone";
import * as analog from "analogging";
import { AudioSample } from "../audio-lib";

/**
 * A web audio lib that uses the Tone module to load and play samples
 */
export class ToneAudioLib extends WebAudioLib {
    protected readonly logger = analog.getLogger("ToneAudioLib");

    /** Maps clip names to players */
    protected players: Record<string, Tone.Player> = {};
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
        return this.path + "/" + encodeURIComponent(fileName) + this.extensionString;
    }

    getSample(name: string): AudioSample | undefined {
        return this.players[name];
    }

    protected getPlayer(name: string): Tone.Player | undefined {
        return this.players[name];
    }

    play(name: string): ToneAudioLib {
        if (!this.isLoaded)
            throw new Error("You must call load before playing");

        Tone.start().then(() => {
            this.logger.debug("Playing", name);
            const player = this.getPlayer(name);
            if (player)
                player.start();
            else
                throw new Error("Player not defined: " + name);
        });

        return this;
    }

    stop(name: string): ToneAudioLib {
        if (!this.isLoaded) return this;

        this.logger.debug("Stopping", name);
        const player = this.getPlayer(name);
        if (player)
            player.stop();
        else
            throw new Error("Player not defined: " + name);

        return this;
    }
}
