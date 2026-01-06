import React, { useState } from 'react';
import { apiPost } from '../api.js';

export default function Contact() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState({ type: 'idle', text: '' });

	function update(key, value) {
		setForm((f) => ({ ...f, [key]: value }));
	}

	async function onSubmit(e) {
		e.preventDefault();
		setStatus({ type: 'loading', text: 'Sending...' });

		try {
			const data = await apiPost('/api/contact', form);
			setStatus({ type: 'success', text: data.message || 'Sent!' });
			setForm({ name: '', email: '', message: '' });
		} catch (err) {
			setStatus({ type: 'error', text: err.message || 'Failed to send.' });
		}
	}

	const noticeClass =
		status.type === 'success'
			? 'notice noticeSuccess'
			: status.type === 'error'
			? 'notice noticeError'
			: 'notice';

	return (
		<div className='container'>
			<h1 className='pageTitle'>Contact</h1>
			<p className='pageSubtitle'>
				Send a message — this posts to your Node backend.
			</p>

			<div className='card'>
				<form onSubmit={onSubmit} className='form'>
					<div className='field'>
						<label>Name</label>
						<input
							className='input'
							value={form.name}
							onChange={(e) => update('name', e.target.value)}
							required
						/>
					</div>

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
						<label>Message</label>
						<textarea
							className='textarea'
							value={form.message}
							onChange={(e) => update('message', e.target.value)}
							required
						/>
					</div>

					<div className='row'>
						<button
							className='btn btnPrimary'
							type='submit'
							disabled={status.type === 'loading'}
						>
							{status.type === 'loading' ? 'Sending...' : 'Send message'}
						</button>
						<span className='badge'>We usually reply soon</span>
					</div>

					{status.type !== 'idle' && (
						<div className={noticeClass}>{status.text}</div>
					)}
				</form>
			</div>
		</div>
	);
}
