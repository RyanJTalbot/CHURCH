import React, { useEffect } from 'react';

export default function About() {
	useEffect(() => {
		document.body.classList.add('homeBody');
		return () => document.body.classList.remove('homeBody');
	}, []);

	return (
		<div className='aboutPage'>
			<section className='aboutHero'>
				<div className='aboutPanel'>
					<h1 className='pageTitle'>About Us</h1>

					<p>
						Our community is built on faith, service, and connection. We strive
						to create a welcoming space for everyone.
					</p>

					<p>
						Through worship, outreach, and fellowship, we work together to make
						a positive impact in our community and beyond.
					</p>

					<p>
						Whether you are new to faith or have been on this journey for years,
						you are welcome here.
					</p>
				</div>
			</section>
		</div>
	);
}
