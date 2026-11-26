// Gentle, muted-by-default Web Audio API felt-piano synthesizer.
// Zero external audio assets required; starts only when user explicitly clicks Play.

class AmbientPianoEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private isPlaying = false;
  private step = 0;

  // Warm nostalgic progression: Fmaj9 -> Em7 -> Dm9 -> Cmaj9
  private readonly chords: number[][] = [
    [174.61, 220.0, 261.63, 329.63, 392.0], // Fmaj9
    [164.81, 196.0, 246.94, 293.66, 392.0], // Em7
    [146.83, 220.0, 261.63, 329.63, 349.23], // Dm9
    [130.81, 196.0, 246.94, 293.66, 329.63], // Cmaj9
  ];

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Soft warm low-pass filter so tones sound like felt piano
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(1150, this.ctx.currentTime);
      lowpass.Q.setValueAtTime(0.7, this.ctx.currentTime);

      // Subtle echo tail for cinematic room warmth
      const delay = this.ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.38, this.ctx.currentTime);
      const feedback = this.ctx.createGain();
      feedback.gain.setValueAtTime(0.28, this.ctx.currentTime);

      this.masterGain.connect(lowpass);
      lowpass.connect(this.ctx.destination);
      lowpass.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(this.ctx.destination);
    }
  }

  private playNote(freq: number, delaySec: number, durationSec: number, peakGain: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + delaySec;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.08, now);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.09);
    noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.45, now + 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.05);
    osc2.stop(now + durationSec + 0.05);
  }

  private scheduleBar() {
    if (!this.isPlaying) return;
    const chord = this.chords[this.step % this.chords.length];
    this.step += 1;

    // Gentle arpeggiated felt piano notes
    chord.forEach((freq, idx) => {
      this.playNote(freq, idx * 0.42, 3.6, idx === 0 ? 0.14 : 0.085);
    });

    // Soft high harmonic shimmer on beat 3
    const highNote = chord[chord.length - 1] * 2;
    this.playNote(highNote, 2.2, 2.6, 0.032);
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    await this.start();
    return true;
  }

  public async start(): Promise<void> {
    if (this.isPlaying) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.55, now + 1.2);

    this.scheduleBar();
    this.timerId = window.setInterval(() => {
      this.scheduleBar();
    }, 3800);
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    }
  }
}

export const ambientPiano = new AmbientPianoEngine();
