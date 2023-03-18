import { GuitarAudioLib } from "./audio-sprites/guitar-audio-lib";
import { PianoAudioLib } from "./audio-sprites/piano-audio-lib";
import * as Tone from "tone";

let guitar: GuitarAudioLib;
let piano: PianoAudioLib;
let instrSelect: HTMLSelectElement;
let noteSelect: HTMLSelectElement;
let octaveSelect: HTMLSelectElement;
let playBtn: HTMLButtonElement;
let stopBtn: HTMLButtonElement;
let progress: HTMLSpanElement;
let keyboard: HTMLDivElement;

export function start(): void {
    console.log("Starting");
    instrSelect = document.getElementById("instrument") as HTMLSelectElement;
    octaveSelect = document.getElementById("octave") as HTMLSelectElement;
    noteSelect = document.getElementById("note") as HTMLSelectElement;
    playBtn = document.getElementById("play") as HTMLButtonElement;
    stopBtn = document.getElementById("stop") as HTMLButtonElement;
    progress = document.getElementById("progress") as HTMLSpanElement;
    keyboard = document.getElementById("keyboard") as HTMLDivElement;

    playBtn.addEventListener("click", playSelectedNote);
    stopBtn.addEventListener("click", stopSelectedNote);
    keyboard.addEventListener("click", playKeyboardNote);
}

function playKeyboardNote(e: MouseEvent): void {
    if ((e.target as HTMLElement).tagName === "BUTTON"){
        const note = (e.target as HTMLButtonElement).innerText + octaveSelect.value;
        if (instrSelect.value === "guitar") {
            playGuitar(note);
        }
        else {
            playPiano(note);
        }    
    }
}

function playSelectedNote(): void {
    const note = `${noteSelect.value}${octaveSelect.value}`;
    if (instrSelect.value === "guitar") {
        playGuitar(note);
    }
    else {
        playPiano(note);
    }
}

function stopSelectedNote(): void {
    const note = `${noteSelect.value}${octaveSelect.value}`;
    if (instrSelect.value === "guitar") {
        guitar?.stop(note);
    }
    else {
        piano?.stop(note);
    }
}

function playGuitar(clip: string): void {
    if (!guitar) {
        console.log("Loading");
        guitar = new GuitarAudioLib("/audio/", ["ogg", "mp3"]);
        guitar.load(onProgressUpdated)
            .then(() => {
                progress.innerText = "100%";
                console.log("Finished loading");
                Tone.start().then(() => playGuitar(clip));
            });
    }
    else {
        guitar.play(clip);
    }
}

function playPiano(clip: string): void {
    if (!piano) {
        console.log("Loading");
        piano = new PianoAudioLib("/audio/", ["ogg", "mp3"]);
        piano.load(onProgressUpdated)
            .then(() => {
                progress.innerText = "100%";
                console.log("Finished loading");
                Tone.start().then(() => playPiano(clip));
            });
    }
    else {    
        piano.play(clip);
    }
}

function onProgressUpdated(pct: number): void {
    progress.innerText = Math.floor(100 * pct) + "%";
}

addEventListener('DOMContentLoaded', start);