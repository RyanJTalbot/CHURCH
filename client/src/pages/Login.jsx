import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import { apiPost } from '../api.js';

export default function Login() {
	const nav = useNavigate();
	const { login } = useAuth();

	const [mode, setMode] = useState('login');
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [status, setStatus] = useState({ type: 'idle', text: '' });

	function update(k, v) {
		setForm((f) => ({ ...f, [k]: v }));
	}

	async function onSubmit(e) {
		e.preventDefault();
		setStatus({
			type: 'loading',
			text: mode === 'login' ? 'Signing in...' : 'Creating account...',
		});

		try {
			if (mode === 'register') {
				await apiPost('/api/auth/register', form);
			}
			await login(form.email, form.password);
			nav('/profile');
		} catch (err) {
			setStatus({ type: 'error', text: err.message || 'Failed.' });
		}
	}

	const noticeClass = status.type === 'error' ? 'notice noticeError' : 'notice';

	return (
		<div className='container'>
			<h1 className='pageTitle'>
				{mode === 'login' ? 'Login' : 'Create Account'}
			</h1>
			<p className='pageSubtitle'>Sign in to access your profile page.</p>

			<div className='card'>
				<div className='row' style={{ marginBottom: 10 }}>
					<button
						className={`btn ${mode === 'login' ? 'btnPrimary' : ''}`}
						onClick={() => setMode('login')}
						type='button'
					>
						Login
					</button>
					<button
						className={`btn ${mode === 'register' ? 'btnPrimary' : ''}`}
						onClick={() => setMode('register')}
						type='button'
					>
						Register
					</button>
				</div>

				<form onSubmit={onSubmit} className='form'>
					{mode === 'register' && (
						<div className='field'>
							<label>Name</label>
							<input
								className='input'
								value={form.name}
								onChange={(e) => update('name', e.target.value)}
								required
							/>
						</div>
					)}

					<div className='field'>
						<label>Email</label>
						<input
							className='input'
							type='email'
							value={form.email}
							onChange={(e) => update('email', e.target.value)}
							required
						/>
					</div>

					<div className='field'>
						<label>Password {mode === 'register' ? '(min 8 chars)' : ''}</label>
						<input
							className='input'
							type='password'
							value={form.password}
							onChange={(e) => update('password', e.target.value)}
							required
						/>
					</div>

					<button
						className='btn btnPrimary'
						type='submit'
						disabled={status.type === 'loading'}
					>
						{status.type === 'loading'
							? 'Please wait...'
							: mode === 'login'
							? 'Sign in'
							: 'Register & sign in'}
					</button>

					{status.type === 'error' && (
						<div className={noticeClass}>{status.text}</div>
					)}
				</form>
			</div>
		</div>
	);
}
