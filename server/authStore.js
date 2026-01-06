import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const usersPath = path.join(dataDir, 'users.json');

async function ensureStore() {
	await fs.mkdir(dataDir, { recursive: true });
	try {
		await fs.access(usersPath);
	} catch {
		await fs.writeFile(usersPath, '[]', 'utf-8');
	}
}

export async function readUsers() {
	await ensureStore();
	const raw = await fs.readFile(usersPath, 'utf-8');
	return JSON.parse(raw);
}

export async function writeUsers(users) {
	await ensureStore();
	await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf-8');
}
