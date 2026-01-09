import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../api.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Register() {
	const nav = useNavigate();
	const { loginWithToken } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');

	async function onSubmit(e) {
		e.preventDefault();
		setError('');
		setBusy(true);
		try {
			// register
			await apiPost('/api/auth/register', { name, email, password });

			// then login immediately (your backend supports /login)
			const data = await apiPost('/api/auth/login', { email, password });
			loginWithToken(data.token, data.user);

			nav('/profile');
		} catch (err) {
			setError(err.message || 'Request failed');
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className='container' style={{ paddingTop: 40, paddingBottom: 40 }}>
			<h1 className='pageTitle'>Create Account</h1>
			<p className='pageSubtitle'>Create an account to access your profile.</p>

			<div className='card' style={{ maxWidth: 720, margin: '0 auto' }}>
				<form onSubmit={onSubmit} className='stack'>
					<label>
						<div className='label'>Name</div>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Your name'
							autoComplete='name'
						/>
					</label>

					<label>
						<div className='label'>Email</div>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='you@example.com'
							autoComplete='email'
						/>
					</label>

					<label>
						<div className='label'>Password (min 8 chars)</div>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='••••••••'
							autoComplete='new-password'
						/>
					</label>

					<button className='btn btnPrimary' disabled={busy}>
						{busy ? 'Creating...' : 'Create account'}
					</button>

					{error ? <div className='notice noticeError'>{error}</div> : null}
				</form>

				<div style={{ marginTop: 14, textAlign: 'center' }}>
					Already have an account?{' '}
					<Link className='link' to='/login'>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}
