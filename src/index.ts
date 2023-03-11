import { GuitarAudioLib } from "./guitar-audio-lib";
import { PianoAudioLib } from "./piano-audio-lib";

let guitar: GuitarAudioLib;
let piano: PianoAudioLib;
let instrSelect: HTMLSelectElement;
let noteSelect: HTMLSelectElement;
let playBtn: HTMLButtonElement;
let stopBtn: HTMLButtonElement;
let progress: HTMLSpanElement;

export function start(): void {
    console.log("Starting");
    instrSelect = document.getElementById("instrument") as HTMLSelectElement;
    noteSelect = document.getElementById("note") as HTMLSelectElement;
    playBtn = document.getElementById("play") as HTMLButtonElement;
    stopBtn = document.getElementById("stop") as HTMLButtonElement;
    progress = document.getElementById("progress") as HTMLSpanElement;

    playBtn.addEventListener("click", playSelectedNote);
    stopBtn.addEventListener("click", stopSelectedNote);
}

function playSelectedNote(): void {
    const note = `${noteSelect.value}4`;
    if (instrSelect.value === "guitar") {
        playGuitar(note);
    }
    else {
        playPiano(note);
    }
}

function stopSelectedNote(): void {
    const note = `${noteSelect.value}4`;
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
        guitar = new GuitarAudioLib("../public/audio/", ["ogg", "mp3"]);
        guitar.load(onProgressUpdated)
            .then(() => {
                progress.innerText = "100%";
                console.log("Finished loading");
                playGuitar(clip);
            });
    }
    else {
        guitar.play(clip);
    }
}

function playPiano(clip: string): void {
    if (!piano) {
        console.log("Loading");
        piano = new PianoAudioLib("../public/audio/", ["ogg", "mp3"]);
        piano.load(onProgressUpdated)
            .then(() => {
                progress.innerText = "100%";
                console.log("Finished loading");
                playPiano(clip);
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