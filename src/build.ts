import {BuildOptions, build as esbuild} from 'esbuild';
import {join} from 'path';
import {distDir, srcDir, tsconfig} from './init';
import {conformTo, stringTruthy} from './util';

export const knownExtensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];
export const entry = join(srcDir, 'index.ts');

const options = conformTo<BuildOptions>()({
	outdir: distDir,
	sourceRoot: srcDir,
	sourcemap: true,
	write: true,
	platform: 'node',
	bundle: true,
	tsconfig,
	format: 'esm',
	minify: stringTruthy(process.env.FLITES_MINIFY),
});

export async function build(entrypoint: string) {
	return esbuild({
		...options,
		entryPoints: [entrypoint],
	}).catch(() => null);
}
