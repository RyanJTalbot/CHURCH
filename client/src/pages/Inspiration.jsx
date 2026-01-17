import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Inspiration() {
	return (
		<div className='container' style={{ paddingTop: 60, paddingBottom: 60 }}>
			<div
				className='card'
				style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}
			>
				<h1 className='pageTitle'>Inspiration</h1>

				<p className='pageSubtitle' style={{ marginTop: 16 }}>
					Have you signed up yet?
				</p>

				<p style={{ fontSize: 18, marginTop: 12 }}>
					Get your inspirational message in your inbox every day.
				</p>

				<div style={{ marginTop: 24 }}>
					<NavLink className='btn btnPrimary' to='/register'>
						Create account
					</NavLink>
				</div>
			</div>
		</div>
	);
}
