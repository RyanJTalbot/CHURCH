import crypto from 'crypto';

export function generateVerifyToken() {
	// token sent to user (keep it long)
	const token = crypto.randomBytes(32).toString('hex');

	// hash stored in DB (so token can't be stolen from DB)
	const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

	// 24 hours expiry
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

	return { token, tokenHash, expiresAt };
}

export function hashToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex');
}
