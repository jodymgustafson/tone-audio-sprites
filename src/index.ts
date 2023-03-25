import * as Tone from "tone";
import { AudioInstrument } from "./audio/audio-instrument";
import { PianoInstrument } from "./audio/tone/instruments/piano-instrument";
import { GuitarInstrument } from "./audio/tone/instruments/guitar-instrument";

const AUDIO_EXTENSIONS = ["ogg", "mp3"];
const AUDIO_PATH = "/audio";

let guitar: AudioInstrument;
let piano: AudioInstrument;
let instrSelect: HTMLSelectElement;
let octaveSelect: HTMLSelectElement;
let progress: HTMLSpanElement;
let keyboard: HTMLDivElement;
let sustain: HTMLInputElement;
let chords: HTMLInputElement;

export function start(): void {
    console.log("Starting");
    instrSelect = document.getElementById("instrument") as HTMLSelectElement;
    octaveSelect = document.getElementById("octave") as HTMLSelectElement;
    sustain = document.getElementById("sustain") as HTMLInputElement;
    chords = document.getElementById("chords") as HTMLInputElement;
    progress = document.getElementById("progress") as HTMLSpanElement;
    keyboard = document.getElementById("keyboard") as HTMLDivElement;

    keyboard.addEventListener("mousedown", playNote);
    keyboard.addEventListener("mouseup", stopNote);
}

function playNote(e: MouseEvent): void {
    const note = getKeyboardNote(e);
    if (note) {
        if (instrSelect.value === "guitar") {
            playGuitar(note);
        }
        else {
            playPiano(note);
        }    
    }
}

function stopNote(e: MouseEvent): void {
    if (sustain.checked) return;

    const note = getKeyboardNote(e);
    if (note) {
        if (instrSelect.value === "guitar") {
            stopInstrument(guitar, note);
        }
        else {
            stopInstrument(piano, note);
        }    
    }
}

function getKeyboardNote(e: MouseEvent): string | undefined {
    if ((e.target as HTMLElement).tagName === "BUTTON"){
        return (e.target as HTMLButtonElement).innerText + octaveSelect.value;
    }
    return undefined;
}

function playGuitar(note: string): void {
    if (!guitar) {
        loadGuitar().then(() => playGuitar(note));
    }
    else {
        playInstrument(guitar, note);
    }
}

function playPiano(note: string): void {
    if (!piano) {
        loadPiano().then(() => playPiano(note));
    }
    else {    
        playInstrument(piano, note);
    }
}

function playInstrument(instrument: AudioInstrument, note: string): void {
    if (chords.checked)
        instrument.play(getChord(note), 20);
    else
        instrument.play(note);
}

function stopInstrument(instrument: AudioInstrument, note: string): void {
    if (chords.checked)
        instrument.stop(getChord(note));
    else
        instrument.stop(note);
}

function loadGuitar(): Promise<void> {
    console.log("Loading guitar");
    guitar = new GuitarInstrument(AUDIO_PATH, AUDIO_EXTENSIONS);
    return guitar.load(onProgressUpdated)
        .then(() => {
            console.log("Finished loading");
            return Tone.start();
        });
}

function loadPiano(): Promise<void> {
    console.log("Loading piano");
    piano = new PianoInstrument(AUDIO_PATH, AUDIO_EXTENSIONS);
    return piano.load(onProgressUpdated)
        .then(() => {
            console.log("Finished loading");
            return Tone.start();
        });
}

function onProgressUpdated(pct: number): void {
    progress.innerText = Math.floor(100 * pct) + "%";
}

addEventListener('DOMContentLoaded', start);

function getChord(note: string): string[] {
    const re = note.split(/([A-G]{1}[#b]?)(\d)/);
    return getChordNotes(re[1]).map(n => n + re[2]);
}

function getChordNotes(root: any): string[] {
    switch (root) {
        case "C": return ["C", "E", "G"];
        case "C#": return ["C#", "F", "Ab"];
        case "D": return ["D", "F#", "A"];
        case "Eb": return ["Eb", "D", "A#"];
        case "E": return ["E", "Gb", "B"];
        case "F": return ["F", "A", "C"];
        case "F#": return ["F#", "A#", "C#"];
        case "G": return ["G", "B", "D"];
        case "Ab": return ["Ab", "C", "Eb"];
        case "A": return ["A", "C#", "E"];
        case "Bb": return ["Bb", "D", "F"];
        case "B": return ["B", "Eb", "F#"];
        default: return [];
    }
}

