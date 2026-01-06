import React from 'react';
import { useAuth } from '../AuthContext.jsx';

export default function Profile() {
	const { user } = useAuth();

	return (
		<div className='container'>
			<h1 className='pageTitle'>My Profile</h1>
			<p className='pageSubtitle'>
				This page is protected — only signed-in users can see it.
			</p>

			<div className='card'>
				<div style={{ display: 'grid', gap: 10 }}>
					<div>
						<span className='badge'>Account</span>
					</div>
					<div>
						<strong>Name:</strong> {user?.name}
					</div>
					<div>
						<strong>Email:</strong> {user?.email}
					</div>
					{user?.createdAt && (
						<div>
							<strong>Joined:</strong>{' '}
							{new Date(user.createdAt).toLocaleString()}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
