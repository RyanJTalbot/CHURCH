import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { apiGet } from '../api.js';

export default function VerifyEmail() {
	const [params] = useSearchParams();
	const token = params.get('token');
	const [status, setStatus] = useState({
		type: 'loading',
		text: 'Verifying...',
	});

	useEffect(() => {
		async function run() {
			if (!token) {
				setStatus({ type: 'error', text: 'Missing token.' });
				return;
			}
			try {
				const data = await apiGet(
					`/api/auth/verify-email?token=${encodeURIComponent(token)}`,
				);
				setStatus({ type: 'success', text: data.message || 'Verified!' });
			} catch (err) {
				setStatus({
					type: 'error',
					text: err.message || 'Verification failed.',
				});
			}
		}
		run();
	}, [token]);

	return (
		<div className='container'>
			<h1 className='pageTitle'>Verify Email</h1>
			<div className='card'>
				<div
					className={
						status.type === 'success'
							? 'notice noticeSuccess'
							: status.type === 'error'
							? 'notice noticeError'
							: 'notice'
					}
				>
					{status.text}
				</div>
				<div style={{ marginTop: 12 }}>
					<Link className='btn btnPrimary' to='/login'>
						Go to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
