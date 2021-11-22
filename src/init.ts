import {existsSync} from 'fs';
import {mkdir, readFile, writeFile, appendFile} from 'fs/promises';
import {basename, join} from 'path';

export const cwd = process.cwd();
export const distDir = join(cwd, 'dist');
export const srcDir = join(cwd, 'src');
export const gitignorePath = join(cwd, '.gitignore');
export const watchFile = join(srcDir, 'index.ts');
export const cwdName = basename(cwd);
export const tsconfig = join(cwd, 'tsconfig.json');

export async function readyWorkspace() {
	const distExists = existsSync(distDir);

	if (!distExists) {
		await mkdir(distDir);
	}

	const gitignore = existsSync(gitignorePath);

	if (!gitignore) {
		await writeFile(gitignorePath, 'dist\n', 'utf-8');
	} else {
		const content = await readFile(gitignorePath);

		if (!content.includes('dist')) {
			await appendFile(gitignorePath, '\ndist\n');
		}
	}
}
