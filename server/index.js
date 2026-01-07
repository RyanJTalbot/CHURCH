import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Contact from './models/Contact.js';
import User from './models/User.js';

import { requireAuth } from './authMiddleware.js';
import { connectDB } from './db.js';
import { generateVerifyToken, hashToken } from './tokens.js';
import { sendVerificationEmail } from './mailer.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
	console.error('Missing JWT_SECRET in server/.env');
	process.exit(1);
}
if (!process.env.MONGODB_URI) {
	console.error('Missing MONGODB_URI in server/.env');
	process.exit(1);
}

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const APP_URL = process.env.APP_URL || 'http://localhost:5173';

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
	res.send('Backend running. Try /api/health');
});

app.get('/api/health', (req, res) => {
	res.json({ ok: true, message: 'Server is healthy' });
});

// ---------- Auth ----------

// Register (creates unverified user + sends email)
app.post('/api/auth/register', async (req, res) => {
	try {
		const { email, password, name } = req.body || {};
		if (!email || !password || !name) {
			return res.status(400).json({ ok: false, error: 'Missing fields' });
		}
		if (password.length < 8) {
			return res
				.status(400)
				.json({ ok: false, error: 'Password must be at least 8 characters' });
		}

		const normalizedEmail = String(email).trim().toLowerCase();
		const exists = await User.findOne({ email: normalizedEmail });
		if (exists) {
			return res
				.status(409)
				.json({ ok: false, error: 'Email already registered' });
		}

		const passwordHash = await bcrypt.hash(password, 12);
		const { token, tokenHash, expiresAt } = generateVerifyToken();

		const user = await User.create({
			email: normalizedEmail,
			name: String(name).trim(),
			passwordHash,
			isVerified: false,
			emailVerifyTokenHash: tokenHash,
			emailVerifyTokenExpiresAt: expiresAt,
		});

		const verifyUrl = `${APP_URL}/verify-email?token=${token}`;
		await sendVerificationEmail({ to: user.email, verifyUrl });

		return res.json({
			ok: true,
			message:
				'Account created. Please check your email to verify your account.',
		});
	} catch (err) {
		console.error('Register error:', err);
		return res.status(500).json({ ok: false, error: 'Server error' });
	}
});

// Verify email
app.get('/api/auth/verify-email', async (req, res) => {
	try {
		const token = String(req.query.token || '');
		if (!token)
			return res.status(400).json({ ok: false, error: 'Missing token' });

		const tokenHash = hashToken(token);

		const user = await User.findOne({
			emailVerifyTokenHash: tokenHash,
			emailVerifyTokenExpiresAt: { $gt: new Date() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ ok: false, error: 'Invalid or expired token' });
		}

		user.isVerified = true;
		user.emailVerifyTokenHash = null;
		user.emailVerifyTokenExpiresAt = null;
		await user.save();

		return res.json({
			ok: true,
			message: 'Email verified. You can now log in.',
		});
	} catch (err) {
		console.error('Verify error:', err);
		return res.status(500).json({ ok: false, error: 'Server error' });
	}
});

// Login (MongoDB user)
app.post('/api/auth/login', async (req, res) => {
	try {
		const { email, password } = req.body || {};
		if (!email || !password) {
			return res.status(400).json({ ok: false, error: 'Missing fields' });
		}

		const normalizedEmail = String(email).trim().toLowerCase();
		const user = await User.findOne({ email: normalizedEmail });
		if (!user) {
			return res
				.status(401)
				.json({ ok: false, error: 'Invalid email or password' });
		}

		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) {
			return res
				.status(401)
				.json({ ok: false, error: 'Invalid email or password' });
		}

		if (!user.isVerified) {
			return res
				.status(403)
				.json({
					ok: false,
					error: 'Please verify your email before logging in.',
				});
		}

		const token = jwt.sign(
			{ sub: user._id.toString(), email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' },
		);

		return res.json({
			ok: true,
			token,
			user: { id: user._id.toString(), email: user.email, name: user.name },
		});
	} catch (err) {
		console.error('Login error:', err);
		return res.status(500).json({ ok: false, error: 'Server error' });
	}
});

// Current user (protected)
app.get('/api/auth/me', requireAuth, async (req, res) => {
	try {
		const user = await User.findById(req.user.sub).select(
			'email name createdAt',
		);
		if (!user)
			return res.status(404).json({ ok: false, error: 'User not found' });

		return res.json({
			ok: true,
			user: {
				id: user._id.toString(),
				email: user.email,
				name: user.name,
				createdAt: user.createdAt,
			},
		});
	} catch (err) {
		console.error('Me error:', err);
		return res.status(500).json({ ok: false, error: 'Server error' });
	}
});

// ---------- Contact ----------
app.post('/api/contact', async (req, res) => {
	try {
		const { name, email, message } = req.body || {};
		if (!name || !email || !message) {
			return res.status(400).json({ ok: false, error: 'Missing fields' });
		}

		const saved = await Contact.create({ name, email, message });
		return res.json({ ok: true, message: 'Saved!', id: saved._id.toString() });
	} catch (err) {
		console.error('Contact error:', err);
		return res.status(500).json({ ok: false, error: 'Server error' });
	}
});

// ---------- Donate (placeholder) ----------
app.post('/api/donate', (req, res) => {
	const { amount, donorName } = req.body || {};
	const numericAmount = Number(amount);
	if (!numericAmount || numericAmount < 1) {
		return res.status(400).json({ ok: false, error: 'Invalid amount' });
	}
	console.log('Donation intent:', { amount: numericAmount, donorName });
	return res.json({
		ok: true,
		message: 'Donation intent created (placeholder).',
		next: 'Integrate Stripe/PayPal here.',
	});
});

// Start server AFTER DB connects
await connectDB();
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
