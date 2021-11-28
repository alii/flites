import {ChildProcessWithoutNullStreams, spawn} from 'child_process';
import chokidar from 'chokidar';
import {extname, relative} from 'path';
import {build, knownExtensions} from './build';
import {cwd, cwdName, readyWorkspace, srcDir} from './init';
import {logger, loggerGroup} from './logger';
import {random} from './util';
import {homedir} from 'os';

// lmao
const messages = [
	'Adding landing gear...',
	'WHERE ARE THE PASSENGERS???',
	'Prepairing chicken curry or pasta dinner',
	'We ran out of fuel',
	'how to get sick bag',
	"there's another crying baby in the back",
	'bruh the legroom gets smaller every year',
	'"nope! ~airline~ has never been late" -nobody',
	"i did have a whole row then a guy sat next to me but he's chill bc i couldnt open my water bottle but he helped so yeah he is nice",
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

	const log = (data: Buffer | string) => console.log(data.toString().trim());

	instance.stdout.on('data', log);
	instance.stdout.on('error', log);
	instance.stderr.on('data', log);
	instance.stderr.on('error', log);

	instance.on('exit', (code, signal) => {
		if (code !== 0) {
			instance.kill();
			process.exit(code ?? 1);
		}

		console.log('\n');
		logger(
			'App exited with code',
			code ?? 'n/a',
			'Reloading will restart the app.',
		);
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

	const friendlyDistDir = relative(homedir(), `${cwdName}/dist`);

	watcher.on('ready', () => {
		log(`dist path is ~/${friendlyDistDir}`);
		log('flight is ready for takeoff!');

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

		child?.kill();
		child = null;
		child = getChild();
	});
});
