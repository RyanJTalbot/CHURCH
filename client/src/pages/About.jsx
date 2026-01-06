import React from 'react';

export default function About() {
	return (
		<div className='container'>
			<h1 className='pageTitle'>About</h1>
			<p className='pageSubtitle'>
				Add your church/organization mission, service times, and community info
				here.
			</p>

			<div className='card'>
				<p style={{ marginTop: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
					This site is a starter template. You can expand it with events,
					announcements, volunteer signups, sermons, and real donation
					processing.
				</p>
			</div>
		</div>
	);
}
