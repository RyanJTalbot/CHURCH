import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
	useEffect(() => {
		document.body.classList.add('homeBody');
		return () => document.body.classList.remove('homeBody');
	}, []);

	return (
		<div className='homePage'>
			<section className='homeHero'>
				<div className='homePanel'>
					<h1 className='pageTitle' style={{ marginTop: 0 }}>
						Live inspired. Reach your dreams. Become all God created you to be.
					</h1>

					<p
						className='pageSubtitle'
						style={{ color: 'rgba(255,255,255,0.8)' }}
					>
						A place for community, faith, and connection.
					</p>

					<p style={{ marginTop: 0, color: 'rgba(255,255,255,0.85)' }}>
						Join us, get involved, or support our mission.
					</p>

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
			</section>
		</div>
	);
}
