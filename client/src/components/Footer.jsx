import React from 'react';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='container'>
				© {new Date().getFullYear()} Church of the Future
			</div>
		</footer>
	);
}
