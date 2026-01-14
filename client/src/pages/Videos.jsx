import React, { useState } from 'react';
import { apiPost } from '../api.js';

export default function Donate() {
	const [amount, setAmount] = useState(25);
	const [donorName, setDonorName] = useState('');
	const [status, setStatus] = useState({ type: 'idle', text: '' });

	async function onDonate(e) {
		e.preventDefault();
		setStatus({ type: 'loading', text: 'Processing...' });

		try {
			const data = await apiPost('/api/donate', { amount, donorName });
			setStatus({ type: 'success', text: data.message || 'Done!' });
		} catch (err) {
			setStatus({ type: 'error', text: err.message || 'Donation failed.' });
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
			<h1 className='pageTitle'>Donate</h1>
			<p className='pageSubtitle'>
				This is a placeholder donation flow. Later you can plug in
				Stripe/PayPal.
			</p>

			<div className='card'>
				<form onSubmit={onDonate} className='form'>
					<div className='field'>
						<label>Name (optional)</label>
						<input
							className='input'
							value={donorName}
							onChange={(e) => setDonorName(e.target.value)}
						/>
					</div>

					<div className='field'>
						<label>Amount (USD)</label>
						<input
							className='input'
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							type='number'
							min='1'
							step='1'
							required
						/>
					</div>

					<div className='row'>
						<button
							className='btn btnPrimary'
							type='submit'
							disabled={status.type === 'loading'}
						>
							{status.type === 'loading' ? 'Processing...' : 'Donate'}
						</button>
						<span className='badge'>Secure payments later</span>
					</div>

					{status.type !== 'idle' && (
						<div className={noticeClass}>{status.text}</div>
					)}
				</form>
			</div>
		</div>
	);
}
