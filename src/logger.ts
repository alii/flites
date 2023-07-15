const emoji = '✈️';

export function logger(...args: unknown[]) {
	console.log(emoji, ...args);
}

export function loggerGroup(width = 50, char = '=', verticalChar = '|') {
	const row = `${emoji} ${char.repeat(width - 1)}`;
	console.log(row);

	return {
		log: (message: string) => {
			const paddingLength = Math.max(
				message.length >= width - 2
					? 0
					: Math.floor((width - message.length) / 2) - 2,
				0,
			);

			const padding = ' '.repeat(paddingLength);
			console.log(verticalChar, padding + message);
		},

		finish: () => {
			console.log(row, '\n');
		},
	};
}
