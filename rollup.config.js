import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'



let plugins = [
    babel({
        babelHelpers: 'bundled'
    })
]


if (process.env.BUILD === 'production') {
    plugins.push(terser())
}



export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'es'
    },
    plugins
}