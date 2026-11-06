/**
 * Audio Engine for Word Sea Adventure
 * Web Audio API synthesizer for rich procedural sound effects & adaptive background music
 * + Web Speech API for authentic Persian voice lines
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private currentMusicTheme: string = 'menu';

  public musicVolume: number = 0.5;
  public sfxVolume: number = 0.8;
  public voiceVolume: number = 0.9;
  public musicEnabled: boolean = true;
  public sfxEnabled: boolean = true;
  public voiceEnabled: boolean = true;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.musicGainNode = this.ctx.createGain();
        this.sfxGainNode = this.ctx.createGain();

        this.musicGainNode.gain.setValueAtTime(this.musicEnabled ? this.musicVolume : 0, this.ctx.currentTime);
        this.sfxGainNode.gain.setValueAtTime(this.sfxEnabled ? this.sfxVolume : 0, this.ctx.currentTime);

        this.musicGainNode.connect(this.ctx.destination);
        this.sfxGainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateSettings(settings: {
    musicVolume: number;
    sfxVolume: number;
    voiceVolume: number;
    musicEnabled: boolean;
    sfxEnabled: boolean;
    voiceEnabled: boolean;
  }) {
    this.musicVolume = settings.musicVolume;
    this.sfxVolume = settings.sfxVolume;
    this.voiceVolume = settings.voiceVolume;
    this.musicEnabled = settings.musicEnabled;
    this.sfxEnabled = settings.sfxEnabled;
    this.voiceEnabled = settings.voiceEnabled;

    if (this.ctx) {
      if (this.musicGainNode) {
        this.musicGainNode.gain.setValueAtTime(
          this.musicEnabled ? this.musicVolume * 0.4 : 0,
          this.ctx.currentTime
        );
      }
      if (this.sfxGainNode) {
        this.sfxGainNode.gain.setValueAtTime(
          this.sfxEnabled ? this.sfxVolume : 0,
          this.ctx.currentTime
        );
      }
    }
  }

  // --- SOUND EFFECTS ---

  public playPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);

    gain.gain.setValueAtTime(this.sfxVolume * 0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playClick() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  public playCorrect(combo: number = 1) {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const multiplier = 1 + Math.min(combo * 0.08, 0.4);
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * multiplier, now + i * 0.07);

      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.6, now + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.36);
    });
  }

  public playWrong() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Playful boing wobble
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.linearRampToValueAtTime(190, now + 0.15);
    osc.frequency.linearRampToValueAtTime(140, now + 0.3);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  public playCoin() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    osc2.frequency.setValueAtTime(987.77 * 1.5, now);
    osc2.frequency.setValueAtTime(1318.51 * 1.5, now + 0.08);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGainNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.42);
    osc2.stop(now + 0.42);
  }

  public playStarReward() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.5, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.45);
    });
  }

  public playVictoryFanfare() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const melody = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.5, d: 0.4 },
      { f: 880.0, d: 0.15 },
      { f: 1046.5, d: 0.6 }
    ];

    let t = this.ctx.currentTime;
    melody.forEach(m => {
      if (!this.ctx || !this.sfxGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(m.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.7, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + m.d);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t);
      osc.stop(t + m.d + 0.05);

      t += m.d + 0.04;
    });
  }

  // --- PROCEDURAL BACKGROUND MUSIC ---

  public startMusic(theme: 'menu' | 'adventure' | 'boss' | 'celebration' = 'adventure') {
    this.currentMusicTheme = theme;
    if (!this.musicEnabled) return;
    this.initContext();
    if (!this.ctx || this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    let step = 0;

    // Ambient scales depending on theme
    const pentatonicAdventure = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    const bossChordNotes = [220.00, 261.63, 311.13, 392.00, 440.00]; // Diminished/Epic
    const celebrationScale = [329.63, 392.00, 440.00, 523.25, 659.25, 783.99];

    const playBgmStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGainNode || !this.musicEnabled) return;

      const now = this.ctx.currentTime;
      let notes = pentatonicAdventure;
      if (this.currentMusicTheme === 'boss') notes = bossChordNotes;
      else if (this.currentMusicTheme === 'celebration') notes = celebrationScale;

      const note = notes[step % notes.length];
      step++;

      // Create gentle atmospheric pad
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.musicVolume * 0.25, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.musicGainNode);

      osc.start(now);
      osc.stop(now + 0.75);
    };

    this.musicIntervalId = window.setInterval(playBgmStep, 500);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  public switchMusicTheme(theme: 'menu' | 'adventure' | 'boss' | 'celebration') {
    this.currentMusicTheme = theme;
  }

  // --- PERSIAN SPEECH SYNTHESIS ---

  public speakPersian(text: string) {
    if (!this.voiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fa-IR';
      utterance.rate = 0.95; // Friendly cadence for 6-8 year olds
      utterance.pitch = 1.2; // Cheerful friendly pitch
      utterance.volume = this.voiceVolume;

      const voices = window.speechSynthesis.getVoices();
      const persianVoice = voices.find(v => v.lang.startsWith('fa') || v.name.includes('Persian') || v.name.includes('Farsi'));
      if (persianVoice) {
        utterance.voice = persianVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback gracefully
    }
  }
}

export const audioService = new AudioEngine();
