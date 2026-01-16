import React from 'react';

export default function Terms() {
	return (
		<div className='container' style={{ paddingTop: 40, paddingBottom: 40 }}>
			<h1 className='pageTitle'>Terms of Use</h1>

			<p>
				By accessing or using this website, you agree to be bound by these Terms
				of Use. If you do not agree with any part of these terms, you may not
				use the site.
			</p>

			<h3>Use of the Website</h3>
			<p>
				This website is provided for informational and community purposes only.
				You agree not to misuse the site, attempt unauthorized access, or
				disrupt the service.
			</p>

			<h3>Accounts</h3>
			<p>
				When creating an account, you are responsible for maintaining the
				confidentiality of your login information and for all activities under
				your account.
			</p>

			<h3>Content</h3>
			<p>
				All content on this site is provided “as is” without warranties of any
				kind. We reserve the right to modify or remove content at any time.
			</p>

			<h3>Limitation of Liability</h3>
			<p>
				We are not liable for any damages arising from your use of this website.
			</p>

			<p style={{ marginTop: 24 }}>
				Last updated: {new Date().toLocaleDateString()}
			</p>
		</div>
	);
}
