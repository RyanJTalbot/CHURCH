import React from 'react';

export default function Privacy() {
	return (
		<div className='container' style={{ paddingTop: 40, paddingBottom: 40 }}>
			<h1 className='pageTitle'>Privacy Policy</h1>

			<p>
				Your privacy is important to us. This Privacy Policy explains how we
				collect, use, and protect your information.
			</p>

			<h3>Information We Collect</h3>
			<p>
				We may collect personal information such as your name, email address,
				and messages submitted through contact forms or account registration.
			</p>

			<h3>How We Use Information</h3>
			<p>
				Information is used to provide services, respond to inquiries, improve
				the website, and manage user accounts.
			</p>

			<h3>Data Protection</h3>
			<p>
				We take reasonable measures to protect your personal information but
				cannot guarantee absolute security.
			</p>

			<h3>Third-Party Services</h3>
			<p>
				This website may embed third-party services (such as YouTube videos)
				which may collect data according to their own privacy policies.
			</p>

			<h3>Your Rights</h3>
			<p>
				You may request access to, correction of, or deletion of your personal
				data by contacting us.
			</p>

			<p style={{ marginTop: 24 }}>
				Last updated: {new Date().toLocaleDateString()}
			</p>
		</div>
	);
}
