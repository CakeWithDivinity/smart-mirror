export function generateUUID(): string {
	try {
		return crypto.randomUUID();
	} catch (error) {
		console.error(error);
		// website is probably used in unsafe context
		return generateUUIDUnsafe();
	}
}

function generateUUIDUnsafe(): string {
	return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
		(+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
	);
}
