import { getToken } from './auth.js';

export async function apiGet(path) {
	const token = getToken();
	const res = await fetch(path, {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(data?.error || 'Request failed');
	return data;
}

export async function apiPost(path, body) {
	const token = getToken();
	const res = await fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		body: JSON.stringify(body),
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(data?.error || 'Request failed');
	return data;
}
