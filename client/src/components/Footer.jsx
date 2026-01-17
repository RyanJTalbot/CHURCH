import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='container footerInner'>
				<div className='footerLeft'>
					© {new Date().getFullYear()} Church of the Future
				</div>

				<div className='footerLinks'>
					<NavLink to='/terms'>Terms of Use</NavLink>
					<span> | </span>
					<NavLink to='/privacy'>Privacy Policy</NavLink>
				</div>
			</div>
		</footer>
	);
}
