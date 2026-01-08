import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { connectDB } from './db.js';
import User from './models/User.js';

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

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
	res.json({ ok: true, message: 'Server is healthy' });
});

// ✅ Register user -> saves to MongoDB
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

		const user = await User.create({
			email: normalizedEmail,
			name: String(name).trim(),
			passwordHash,
		});

		return res.json({
			ok: true,
			message: 'Registered successfully',
			user: { id: user._id.toString(), email: user.email, name: user.name },
		});
	} catch (err) {
		console.error('Register error:', err);
		return res.status(500).json({ ok: false, error: 'Server error' });
	}
});

// ✅ Login user -> reads from MongoDB
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

await connectDB();
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
