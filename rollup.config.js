import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        sourcemap: true,
        format: 'esm',
        name: 'krayon',
        file: 'dist/krayon.esm.js'
      },
      {
        sourcemap: true,
        format: 'cjs',
        name: 'krayon',
        file: 'dist/krayon.cjs.js'
      }
    ],
    plugins: [
      typescript()
    ],
    watch: {
      clearScreen: false
    }
  }
])