// Web Audio API procedural vehicle sound synthesizer
class SoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playEngineSound(type: string, maxSpeed: number = 150) {
    this.stopEngineSound();
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    this.isPlaying = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.3);

    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';

    if (type.includes('ELECTRIC')) {
      // Futuristic EV electric motor whine
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(140, now);
      this.osc1.frequency.exponentialRampToValueAtTime(780, now + 2.0);

      this.filterNode.frequency.setValueAtTime(1200, now);
      this.osc1.connect(this.gainNode);
    } else if (type === 'BIKE' && maxSpeed > 140) {
      // High-rev Superbike screamer (KTM / Ninja)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(85, now);
      this.osc1.frequency.exponentialRampToValueAtTime(320, now + 1.8);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(170, now);
      this.osc2.frequency.exponentialRampToValueAtTime(640, now + 1.8);

      this.filterNode.frequency.setValueAtTime(2400, now);
      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
    } else if (type === 'SCOOTER') {
      // Smooth scooter CVT hum (Activa / Jupiter)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'triangle';
      this.osc1.frequency.setValueAtTime(95, now);
      this.osc1.frequency.exponentialRampToValueAtTime(220, now + 2.0);

      this.filterNode.frequency.setValueAtTime(800, now);
      this.osc1.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
    } else {
      // Deep cruiser rumble / car roar (Royal Enfield 350 / Thar 4x4)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(45, now);
      this.osc1.frequency.exponentialRampToValueAtTime(160, now + 1.5);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(90, now);
      this.osc2.frequency.exponentialRampToValueAtTime(280, now + 1.5);

      this.filterNode.frequency.setValueAtTime(750, now);
      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
    }

    this.gainNode.connect(this.ctx.destination);
    this.osc1?.start(now);
    this.osc2?.start(now);

    // Fade out after 4 seconds
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4.0);
    setTimeout(() => {
      this.stopEngineSound();
    }, 4100);
  }

  public stopEngineSound() {
    if (!this.isPlaying) return;
    try {
      if (this.osc1) {
        this.osc1.stop();
        this.osc1.disconnect();
        this.osc1 = null;
      }
      if (this.osc2) {
        this.osc2.stop();
        this.osc2.disconnect();
        this.osc2 = null;
      }
      if (this.gainNode) {
        this.gainNode.disconnect();
        this.gainNode = null;
      }
      this.isPlaying = false;
    } catch {
      this.isPlaying = false;
    }
  }
}

export const soundEngine = new SoundEngine();
