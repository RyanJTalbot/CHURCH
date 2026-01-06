import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readUsers, writeUsers } from './authStore.js';
import { requireAuth } from './authMiddleware.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
	console.error('Missing JWT_SECRET in server/.env');
	process.exit(1);
}

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

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

// Register
app.post('/api/auth/register', async (req, res) => {
	const { email, password, name } = req.body || {};
	if (!email || !password || !name) {
		return res.status(400).json({ ok: false, error: 'Missing fields' });
	}

	const normalizedEmail = String(email).trim().toLowerCase();
	if (password.length < 8) {
		return res
			.status(400)
			.json({ ok: false, error: 'Password must be at least 8 characters' });
	}

	const users = await readUsers();
	const exists = users.some((u) => u.email === normalizedEmail);
	if (exists) {
		return res
			.status(409)
			.json({ ok: false, error: 'Email already registered' });
	}

	const passwordHash = await bcrypt.hash(password, 12);
	const id = crypto.randomUUID();

	const user = {
		id,
		email: normalizedEmail,
		name: String(name).trim(),
		passwordHash,
		createdAt: new Date().toISOString(),
	};
	users.push(user);
	await writeUsers(users);

	return res.json({ ok: true, message: 'Registered successfully' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
	const { email, password } = req.body || {};
	if (!email || !password) {
		return res.status(400).json({ ok: false, error: 'Missing fields' });
	}

	const normalizedEmail = String(email).trim().toLowerCase();
	const users = await readUsers();
	const user = users.find((u) => u.email === normalizedEmail);

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
		{ sub: user.id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: '7d' },
	);

	return res.json({
		ok: true,
		token,
		user: { id: user.id, email: user.email, name: user.name },
	});
});

// Current user (protected)
app.get('/api/auth/me', requireAuth, async (req, res) => {
	const users = await readUsers();
	const user = users.find((u) => u.id === req.user.sub);
	if (!user)
		return res.status(404).json({ ok: false, error: 'User not found' });

	return res.json({
		ok: true,
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
		},
	});
});

// ---------- Existing endpoints ----------
app.post('/api/contact', (req, res) => {
	const { name, email, message } = req.body || {};
	if (!name || !email || !message) {
		return res.status(400).json({ ok: false, error: 'Missing fields' });
	}
	console.log('Contact submission:', { name, email, message });
	return res.json({ ok: true, message: 'Thanks! We received your message.' });
});

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

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
