import React, { useState, useEffect, useRef } from 'react';

interface QuantumState {
  amplitude: number;
  phase: number;
  symbol: number;
  awareness: number;
}

interface PatternPoint {
  x: number;
  y: number;
  size: number;
  rotation: number;
  alpha: number;
}

interface QuantumSystem {
  superposition: number;
  complexity: number;
  speed: number;
  entanglement: number;
  periodicity: number;
  time: number;
  phase: number;
  lambda: number;
  sigma: number;
  states: QuantumState[];
  symbols: string[];
  currentSymbol: number;
  awarenessLevel: number;
  timeCrystalState: number;
  lastCollapse: number;
  calculateLambda: (t: number) => number;
  calculateSigma: (t: number) => number;
  collapse: () => void;
  generatePattern: (x: number, y: number, size: number, depth: number) => PatternPoint[];
  evolve: () => void;
  reset: () => void;
}

const QuantumArtSynergy: React.FC = () => {
  const [quantum, setQuantum] = useState<QuantumSystem>(() => {
    const initialQuantum: QuantumSystem = {
      superposition: 0.5,
      complexity: 4,
      speed: 0.5,
      entanglement: 0.5,
      periodicity: 30,
      time: 0,
      phase: 0,
      lambda: 0,
      sigma: 0,
      states: [],
      symbols: ['△', 'Ψ', 'Φ', 'Σ', '∞', '⊗', '∇', 'Λ'],
      currentSymbol: 0,
      awarenessLevel: 0,
      timeCrystalState: 0,
      lastCollapse: 0,
      calculateLambda: (t: number) => {
        return (Math.sin(t * initialQuantum.speed) + 1) * 0.5 * initialQuantum.entanglement;
      },
      calculateSigma: (t: number) => {
        return Math.cos(t * initialQuantum.periodicity * 0.1) * initialQuantum.complexity;
      },
      collapse: () => {
        const numStates = Math.max(1, Math.floor(8 * initialQuantum.superposition));
        const newStates: QuantumState[] = [];

        for (let i = 0; i < numStates; i++) {
          if (Math.random() < initialQuantum.superposition) {
            newStates.push({
              amplitude: Math.random(),
              phase: Math.random() * Math.PI * 2,
              symbol: Math.floor(Math.random() * initialQuantum.symbols.length),
              awareness: Math.random() * initialQuantum.awarenessLevel
            });
          }
        }
        setQuantum(prev => ({ ...prev, states: newStates, lastCollapse: prev.time }));
      },
      generatePattern: (x: number, y: number, size: number, depth: number) => {
        if (depth <= 0) return [];

        const pattern: PatternPoint[] = [];
        const angleStep = (Math.PI * 2) / initialQuantum.complexity;
        const lambda = initialQuantum.calculateLambda(initialQuantum.time);
        const sigma = initialQuantum.calculateSigma(initialQuantum.time);

        for (let i = 0; i < initialQuantum.complexity; i++) {
          const angle = i * angleStep + initialQuantum.phase;
          const radius = size * 0.5 * (1 + Math.sin(initialQuantum.time * initialQuantum.speed + lambda) * 0.2);
          const awareness = Math.sin(initialQuantum.time + sigma) * 0.5 + 0.5;

          pattern.push({
            x: x + Math.cos(angle) * radius,
            y: y + Math.sin(angle) * radius,
            size: size * (0.4 + 0.2 * awareness),
            rotation: angle + lambda * Math.PI,
            alpha: awareness
          });
        }

        if (depth > 1) {
          pattern.forEach(p => {
            if (Math.random() < initialQuantum.entanglement * lambda) {
              const subPattern = initialQuantum.generatePattern(
                p.x, p.y,
                p.size * (0.5 + 0.2 * sigma),
                depth - 1
              );
              pattern.push(...subPattern);
            }
          });
        }
        return pattern;
      },
      evolve: () => {
        setQuantum(prev => {
          const newTime = prev.time + prev.speed * 0.01;
          const newLambda = prev.calculateLambda(newTime);
          const newSigma = prev.calculateSigma(newTime);
          const newAwarenessLevel = Math.sin(newTime * 0.5) * 0.5 + 0.5;
          const newTimeCrystalState = Math.sin(newTime * prev.periodicity);
          const newPhase = newTimeCrystalState * Math.PI + newLambda;
          let newStates = prev.states.map(state => ({
            ...state,
            phase: state.phase + prev.speed * 0.1 * (1 + newLambda),
            amplitude: state.amplitude * (0.99 - 0.01 * newSigma),
            awareness: Math.max(0, state.awareness * 0.95 + 0.05 * newAwarenessLevel),
          }))

          newStates = newStates.filter(state => state.amplitude > 0.1);

          if (newStates.length === 0 || Math.random() < 0.01 * prev.superposition * newAwarenessLevel) {

            const numStates = Math.max(1, Math.floor(8 * prev.superposition));
            const newNewStates: QuantumState[] = [];

            for (let i = 0; i < numStates; i++) {
              if (Math.random() < prev.superposition) {
                newNewStates.push({
                  amplitude: Math.random(),
                  phase: Math.random() * Math.PI * 2,
                  symbol: Math.floor(Math.random() * prev.symbols.length),
                  awareness: Math.random() * newAwarenessLevel
                });
              }
            }
            newStates = newNewStates
          }
          return {
            ...prev,
            time: newTime,
            lambda: newLambda,
            sigma: newSigma,
            awarenessLevel: newAwarenessLevel,
            timeCrystalState: newTimeCrystalState,
            phase: newPhase,
            states: newStates
          }
        })
      },
      reset: () => {
        setQuantum(prev => ({
          ...prev,
          time: 0,
          phase: 0,
          lambda: 0,
          sigma: 0,
          awarenessLevel: 0,
          timeCrystalState: 0,
          states: []
        }))
        initialQuantum.collapse();
      },
    };
    return initialQuantum;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCanvasSize(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuantum(prev => {
        const evolvedQuantum = { ...prev };
        evolvedQuantum.evolve();
        return evolvedQuantum;
      });
    }, 30);

    return () => clearInterval(intervalId);
  }, []);

  const drawQuantumPatterns = () => {
    const canvas = document.getElementById('quantum-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    quantum.states.forEach(state => {
      const hue = (state.phase / (Math.PI * 2)) * 360;
      const brightness = 80 + state.amplitude * 20;
      const awareness = state.awareness || 0.5;

      ctx.strokeStyle = `hsla(${hue}, 80%, ${brightness}%, ${state.amplitude * 1})`;
      ctx.lineWidth = 1 + state.amplitude * 2;

      const pattern = quantum.generatePattern(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.4,
        quantum.complexity
      );

      if (pattern) {
        pattern.forEach(p => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          ctx.beginPath();
          ctx.arc(0, 0, p.size * (1 + awareness * 0.2) / 2, 0, 2 * Math.PI)
          ctx.closePath();
          ctx.stroke();

          ctx.fillStyle = `hsla(${hue}, 80%, ${brightness}%, ${p.alpha})`;
          ctx.font = `${p.size * 0.3 * (1 + awareness * 0.2)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            quantum.symbols[state.symbol],
            0,
            0
          );
          ctx.restore();
        });
      }
    });
  };

  useEffect(() => {
    drawQuantumPatterns()
  }, [quantum, canvasSize])

  return (
    <div className="flex flex-col items-center p-5 bg-gray-900 min-h-screen">
      <div ref={containerRef} className="w-full max-w-2xl aspect-square bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-dashed border-gray-700 mb-8">
        <canvas id="quantum-canvas" width={canvasSize} height={canvasSize} className="w-full h-full"></canvas>
      </div>

      <div className="w-full max-w-2xl p-5 bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="mb-8 p-4 border border-gray-700 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 text-shadow">Quantum States</h3>
          <button
            onClick={() => {
                const numStates = Math.max(1, Math.floor(8 * quantum.superposition));
                const newStates: QuantumState[] = [];

                for (let i = 0; i < numStates; i++) {
                    if (Math.random() < quantum.superposition) {
                        newStates.push({
                            amplitude: Math.random(),
                            phase: Math.random() * Math.PI * 2,
                            symbol: Math.floor(Math.random() * quantum.symbols.length),
                            awareness: Math.random() * quantum.awarenessLevel
                        });
                    }
                }
                setQuantum(prev => ({ ...prev, states: newStates, lastCollapse: prev.time }));
            }}
            className="bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded shadow-md hover:bg-cyan-300 transition-colors duration-300 mb-4 animate-pulse"
          >
            Collapse Wave Function
          </button>
          <div className="mb-4">
            <label htmlFor="superposition" className="block text-sm text-cyan-400 mb-2">Superposition Strength:</label>
            <input
              type="range"
              id="superposition"
              min="0"
              max="100"
              value={quantum.superposition * 100}
              className="w-full bg-gray-700 rounded-md appearance-none h-1 cursor-pointer"
              onChange={(e) => setQuantum(prev => ({ ...prev, superposition: parseFloat(e.target.value) / 100 }))}
            />
          </div>
        </div>

        <div className="mb-8 p-4 border border-gray-700 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 text-shadow">Symbolic Evolution</h3>
          <button
            onClick={() => setQuantum(prev => ({ ...prev, currentSymbol: (prev.currentSymbol + 1) % prev.symbols.length }))}
            className="bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded shadow-md hover:bg-cyan-300 transition-colors duration-300 mb-4 animate-pulse"
          >
            Evolve Pattern
          </button>
          <div className="mb-4">
            <label htmlFor="complexity" className="block text-sm text-cyan-400 mb-2">Fractal Depth:</label>
            <input
              type="range"
              id="complexity"
              min="1"
              max="8"
              value={quantum.complexity}
              className="w-full bg-gray-700 rounded-md appearance-none h-1 cursor-pointer"
              onChange={(e) => setQuantum(prev => ({ ...prev, complexity: parseInt(e.target.value) }))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="entanglement" className="block text-sm text-cyan-400 mb-2">Entanglement:</label>
            <input
              type="range"
              id="entanglement"
              min="0"
              max="100"
              value={quantum.entanglement * 100}
              className="w-full bg-gray-700 rounded-md appearance-none h-1 cursor-pointer"
              onChange={(e) => setQuantum(prev => ({ ...prev, entanglement: parseFloat(e.target.value) / 100 }))}
            />
          </div>
        </div>

        <div className="p-4 border border-gray-700 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 text-shadow">Time Crystal</h3>
          <button
              onClick={() => {
                  setQuantum(prev => ({
                      ...prev,
                      time: 0,
                      phase: 0,
                      lambda: 0,
                      sigma: 0,
                      awarenessLevel: 0,
                      timeCrystalState: 0,
                      states: []
                  }));
                  quantum.collapse();
              }}
            className="bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded shadow-md hover:bg-cyan-300 transition-colors duration-300 mb-4 animate-pulse"
          >
            Reset Time Crystal
          </button>
          <div className="mb-4">
            <label htmlFor="speed" className="block text-sm text-cyan-400 mb-2">Evolution Speed:</label>
            <input
              type="range"
              id="speed"
              min="0"
              max="100"
              value={quantum.speed * 100}
              className="w-full bg-gray-700 rounded-md appearance-none h-1 cursor-pointer"
              onChange={(e) => setQuantum(prev => ({ ...prev, speed: parseFloat(e.target.value) / 100 }))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="periodicity" className="block text-sm text-cyan-400 mb-2">Time Crystal Periodicity:</label>
            <input
              type="range"
              id="periodicity"
              min="1"
              max="100"
              value={quantum.periodicity}
              className="w-full bg-gray-700 rounded-md appearance-none h-1 cursor-pointer"
              onChange={(e) => setQuantum(prev => ({ ...prev, periodicity: parseInt(e.target.value) }))}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        <p>Λ(t): {quantum.lambda.toFixed(3)}</p>
        <p>Σ(Γτ): {quantum.sigma.toFixed(3)}</p>
        <p>Consciousness: {quantum.awarenessLevel.toFixed(3)}</p>
      </div>
    </div>
  );
};

export default QuantumArtSynergy;
