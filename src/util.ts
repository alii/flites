export function random<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function stringTruthy(str?: string) {
	if (!str) {
		return false;
	}

	return [
		'1',
		't',
		'true',
		'yes',
		'ok',
		'y',
		'okay',
		'yup',
		'yeah',
		'sure',
		'bet',
	].includes(str.toLowerCase());
}

export function conformTo<T>() {
	return <X extends T>(data: X) => data;
}
