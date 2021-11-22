import {build as esbuild, BuildOptions} from 'esbuild';
import {join} from 'path';
import {tsconfig, distDir, srcDir} from './init';
import {conformTo, stringTruthy} from './util';

export const knownExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];
export const entry = join(srcDir, 'index.ts');

const options = conformTo<BuildOptions>()({
	outdir: distDir,
	sourceRoot: srcDir,
	sourcemap: true,
	write: true,
	entryPoints: [entry],
	platform: 'node',
	bundle: true,
	tsconfig,
	format: 'cjs',
	minify: stringTruthy(process.env.FLIGHT_MINIFY),
});

export async function build() {
	return esbuild(options).catch(() => null);
}
