import React, { useState } from 'react';
import { apiPost } from '../api.js';

export default function Contact() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [busy, setBusy] = useState(false);
	const [notice, setNotice] = useState(null);

	async function onSubmit(e) {
		e.preventDefault();
		setNotice(null);
		setBusy(true);

		try {
			const res = await apiPost('/api/contact', {
				name,
				email,
				message,
			});

			if (res.ok) {
				setNotice({ type: 'success', text: res.message });
				setName('');
				setEmail('');
				setMessage('');
			}
		} catch (err) {
			setNotice({
				type: 'error',
				text: err.message || 'Failed to send message',
			});
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className='container' style={{ paddingTop: 40 }}>
			<h1 className='pageTitle'>Contact Us</h1>
			<p className='pageSubtitle'>
				Send us a message and we’ll get back to you.
			</p>

			<div className='card' style={{ maxWidth: 720 }}>
				<form onSubmit={onSubmit} className='stack'>
					<label>
						<div className='label'>Name</div>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</label>

					<label>
						<div className='label'>Email</div>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>

					<label>
						<div className='label'>Message</div>
						<textarea
							rows={5}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						/>
					</label>

					<button className='btn btnPrimary' disabled={busy}>
						{busy ? 'Sending...' : 'Send message'}
					</button>

					{notice && (
						<div
							className={
								notice.type === 'success'
									? 'notice noticeSuccess'
									: 'notice noticeError'
							}
						>
							{notice.text}
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
