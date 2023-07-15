#!/usr/bin/env node

import {ChildProcessWithoutNullStreams, spawn} from 'child_process';
import chokidar from 'chokidar';
import {extname, relative} from 'path';
import {build, knownExtensions} from './build';
import {cwd, readyWorkspace, srcDir} from './init';
import {logger, loggerGroup} from './logger';
import {random} from './util';

const messages = [
	'Adding landing gear...',
	'WHERE ARE THE PASSENGERS???',
	'Prepairing chicken curry or pasta dinner',
	'We ran out of fuel',
	'how to get sick bag',
	"there's another crying baby in the back",
	'bruh the legroom gets smaller every year',
	'"nope! ~airline~ has never been late" -nobody',
] as const;

const entrypoint = process.argv[2] ?? './src/index.ts';

const getChild = () => {
	const instance = spawn('node', ['dist/index.js'], {
		env: {
			...process.env,
			NODE_ENV: process.env.NODE_ENV ?? 'development',
		},
		cwd,
	});

	const write = (
		mode: 'stdout' | 'stderr',
	): ((data: Buffer | string) => void) => {
		return buf => {
			process[mode].write(buf);
		};
	};

	instance.stdout.on('data', write('stdout'));
	instance.stdout.on('error', write('stdout'));
	instance.stderr.on('data', write('stderr'));
	instance.stderr.on('error', write('stderr'));

	instance.on('exit', code => {
		if (code) {
			logger('App exited with code', code, 'Reloading will restart the app.');
		} else {
			logger('App exited. Reloading will restart the app.');
		}

		if (code !== 0) {
			instance.kill();
		}
	});

	return instance;
};

void readyWorkspace().then(async () => {
	const {log, finish} = loggerGroup();

	log(random(messages));

	await build(entrypoint);

	let child: ChildProcessWithoutNullStreams | null = getChild();

	const watcher = chokidar.watch(srcDir, {
		useFsEvents: true,
	});

	const friendlyDistDir = relative(process.cwd(), `./dist`);

	watcher.on('ready', () => {
		log(`dist path is ./${friendlyDistDir}`);
		log('flites is ready for takeoff!');

		finish();
	});

	watcher.on('change', async path => {
		const ext = extname(path);

		if (!knownExtensions.includes(ext)) {
			return;
		}

		const now = performance.now();

		const result = await build(entrypoint);

		if (!result || result.errors.length) {
			const message = result?.errors.length
				? result.errors.map(err => err.text).join(', ')
				: 'Something went wrong';

			logger(message);
		} else {
			logger(
				`rebuild ${entrypoint} took ${Math.trunc(performance.now() - now)}ms\n`,
			);
		}

		if (child) {
			child.kill();
		}

		child = null;
		child = getChild();
	});
});
