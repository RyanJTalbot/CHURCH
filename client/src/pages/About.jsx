import React, { useEffect } from 'react';
import heroImg from '../assets/Clouds_shattering_the_sun_rays.jpg';

export default function About() {
	useEffect(() => {
		// make About page use a light background like the reference
		document.body.classList.add('lightBody');
		return () => document.body.classList.remove('lightBody');
	}, []);

	return (
		<div className='aboutModern'>
			{/* HERO */}
			<section
				className='aboutHeroModern'
				style={{ backgroundImage: `url(${heroImg})` }}
				aria-label='About hero'
			/>

			{/* OVERLAP CONTENT PANEL */}
			<section className='aboutPanelWrap'>
				<div className='aboutPanelModern'>
					<div className='aboutPanelInner'>
						<h2>A Global Landmark</h2>
						<p>
							In 2003, our community began a new season of growth and outreach.
							Over the years, we’ve continued to expand our mission—welcoming
							new members, serving families, and creating spaces for worship,
							discipleship, and community support.
						</p>

						<h3>Reaching a New Generation with a Message of Hope</h3>
						<p>
							From our earliest days, we’ve focused on reaching people where
							they are—locally and globally. Through messages of hope, practical
							teaching, and community engagement, we aim to help individuals and
							families take their next step forward.
						</p>
						<p>
							We believe church should feel like home: a place where you can
							grow in faith, build strong relationships, and find encouragement
							for everyday life.
						</p>

						<p>
							Today, we continue that mission through worship gatherings, online
							messages, serving opportunities, and ministries for every age.
						</p>
					</div>
				</div>
			</section>

			{/* OPTIONAL: second full-width image section like the screenshot */}
			<section className='aboutWideImage' aria-label='About secondary image'>
				<div className='aboutWideImageOverlay' />
			</section>
		</div>
	);
}
