# Tone Audio Sprites

This demonstrates how to define and use a library of audio sprites using the [Tone.js](https://tonejs.github.io/) web audio framework.

## Test App
The test app is a single page app that uses the audio modules to demonstrate playing notes and chords.

It uses [Vite](https://vitejs.dev/) to run locally. There's no need to build. To start use:

    npm run dev

## Class Hierarchy
- AudioLib: interface for all audio libs
  - WebAudioLib: base class for web audio libs
    - ToneAudioLib: a web audio lib that uses Tone.js
      - ToneSampleSpriteLib: a tone audio lib that uses sprites from audio sample files

- AudioInstrument: interface for all audio instruments
  - BaseInstrument: base class for instruments
    - GuitarInstrument: an instrument with guitar notes
    - PianoInstrument: an instrument with piano notes
