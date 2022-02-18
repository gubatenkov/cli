import React, { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const ref = useRef<any>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if (!ref.current) return;
    console.log(ref.current);
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });
    setOutput(result.code);
  };

  return (
    <div className="app">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>submit</button>
      </div>
      <pre>{output}</pre>
    </div>
  );
};

export default App;
