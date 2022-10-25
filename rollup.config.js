import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import commonjs from '@rollup/plugin-commonjs';

const plugins = [resolve(), commonjs()];

const esm = {
  input: './src/index.js',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm'
  },
  plugins
};

const iife = {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    name: 'QuillColorPickerEnhance',
    exports: 'named',
    format: 'iife'
  },
  plugins
};

function generateConfig(config, withTerser = true) {
  const minConfig = {
    ...config
  };
  minConfig.output = {
    ...config.output,
    file: withTerser ? config.output.file.replace(/\.js$/i, '.min.js') : config.output.file,
    sourcemap: withTerser
  };
  minConfig.plugins = [...config.plugins, ...(withTerser ? [terser()] : [])];
  return [config, minConfig];
}

export default [...generateConfig(esm), ...generateConfig(iife)];
