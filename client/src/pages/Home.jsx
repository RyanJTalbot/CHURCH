import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
	return (
		<div className='container'>
			<h1 className='pageTitle'>Welcome 👋</h1>
			<p className='pageSubtitle'>
				A clean starter site with Home, About, Contact, Donate, Login, and a
				protected Profile page.
			</p>

			<div className='card'>
				<div className='cardHeader'>
					<div>
						<div style={{ fontWeight: 700, fontSize: 18 }}>Get started</div>
						<div style={{ color: 'var(--muted)', marginTop: 4 }}>
							Try the pages below to confirm everything works.
						</div>
					</div>
					<span className='badge'>Ready</span>
				</div>

				<div className='row'>
					<NavLink className='btn btnPrimary' to='/donate'>
						Donate
					</NavLink>
					<NavLink className='btn' to='/contact'>
						Contact
					</NavLink>
					<NavLink className='btn' to='/about'>
						About
					</NavLink>
				</div>
			</div>
		</div>
	);
}
