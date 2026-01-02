/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

let audioCtx: AudioContext | null = null;

const getCtx = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
}

const resumeContext = () => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    return ctx;
}

export const playShootSound = () => {
    try {
        const ctx = resumeContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) { /* ignore audio errors */ }
};

export const playPopSound = (count = 1) => {
     try {
        const ctx = resumeContext();
        const now = ctx.currentTime;
        
        // Cap effective count to prevent frequency from going too high
        const effectiveCount = Math.min(count, 12);
        
        // Base pitch rises with match count to sound more exciting
        // Starting frequency roughly around Middle C (261Hz) and scaling up
        const baseFreq = 261.63 * Math.pow(1.06, effectiveCount * 2); 

        const playTone = (freq: number, type: OscillatorType, startTime: number, duration: number, vol: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = type;
            osc.frequency.value = freq;
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            // Attack
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
            // Decay
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            osc.start(startTime);
            osc.stop(startTime + duration);
        };

        // 1. The main "Bubble Pop" character (Pitch sweep)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.15); // Sweep up for "bloop"
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        
        osc.start(now);
        osc.stop(now + 0.15);

        // 2. Success Chimes/Harmonics for combos (3 or more)
        if (count >= 3) {
            // Harmonic structure for a pleasant chime
            
            // Root Note
            playTone(baseFreq, 'sine', now, 0.3, 0.1);
            
            // Major 3rd (creates a happy major chord feeling)
            playTone(baseFreq * 1.25, 'triangle', now + 0.05, 0.3, 0.08);
            
            // Perfect 5th
            playTone(baseFreq * 1.5, 'sine', now + 0.1, 0.35, 0.08);

            // Reward for big combos (5+)
            if (count >= 5) {
                // High Octave sparkle
                playTone(baseFreq * 2, 'sine', now + 0.15, 0.5, 0.05);
                playTone(baseFreq * 2.5, 'sine', now + 0.2, 0.4, 0.03); 
            }
        }

    } catch (e) { /* ignore audio errors */ }
};

export const playLandSound = () => {
     try {
        const ctx = resumeContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) { /* ignore audio errors */ }
}

export const playUiClick = () => {
    try {
        const ctx = resumeContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

        osc.start();
        osc.stop(ctx.currentTime + 0.03);
    } catch (e) { /* ignore audio errors */ }
}