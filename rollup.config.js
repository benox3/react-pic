import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import { minify } from 'uglify-es';
import pkg from './package.json';

const isProd = process.env.BUILD === 'production';

const getDestination = (dest) => {
  if (isProd) return dest.replace('.js', '.min.js');
  return dest;
};

const config = {
  input: 'src/index.js',
  external: ['react', 'react-addons-shallow-compare'],

  plugins: [
    babel({
      babelrc: false,
      presets: [
        ['es2015', { modules: false }],
        'react',
      ],

      plugins: [
        'transform-object-rest-spread',
        'transform-class-properties',
        'external-helpers',
      ],

      exclude: 'node_modules/**', // only transpile our source code
    }),
    resolve({
      extensions: ['.js', '.jsx'],
      jsnext: true,
      browser: true,
    }),
    commonjs(),
    isProd && uglify({}, minify),
  ],
};

export default [
  Object.assign({}, config, {
    output: [
      {
        format: 'umd',
        file: getDestination(pkg.umd),
        name: 'Pic',
      },
    ],
    plugins: [
      replace({
        include: './src/common/**',
        server: '/browser',
        delimiters: ['/', ''],
      }),
    ].concat(config.plugins),
    globals: {
      react: 'React',
    },
  }),
  Object.assign({}, config, {
    output: [
      {
        format: 'cjs',
        file: getDestination(pkg.main),
        name: 'Pic',
      },
      {
        format: 'es',
        file: getDestination(pkg.module),
        name: 'Pic',
      },
    ],
    plugins: config.plugins,
  }),
];
