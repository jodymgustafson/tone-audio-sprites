export const NOTE_NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const NOTE_ALIASES: Record<string, string> = {
    "Db": "C#",
    "D#": "Eb",
    "Gb": "F#",
    "G#": "Ab",
    "A#": "Bb",
};

/** Defines an instrument that can play multiple notes */
export interface AudioInstrument {
    /** Returns true if the audio has been loaded */
    isLoaded: boolean;

    /**
     * Loads the audio for the instrument
     */
    load(progress?: (pct: number) => any): Promise<void>;

    /**
     * Plays one or more notes
     * @param notes Notes to play including octave, e.g. C4, F#5
     */
    play(notes: string[], strumDelay?: number): void;

    /**
     * Plays a note
     * @param note Note to play including octave, e.g. C4, F#5
     */
    play(note: string): void;

    /**
     * Stops playback of one or more notes
     * @param notes Notes to stop including octave, e.g. C4, F#5
     */
    stop(notes: string[]): void;

    /**
     * Stops playback of a note
     * @param note Note to stop including octave, e.g. C4, F#5
     */
    stop(note: string): void;
}

export function normalizeNoteNames(notes: string[]): string[] {
    return notes.map(n => normalizeNoteName(n));
}

export function normalizeNoteName(note: string): string {
    const alias = NOTE_ALIASES[note.slice(0, 2)];
    if (alias) {
        return alias + note.slice(-1);
    }
    return note;
}