import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Navbar() {
	const { user, loading, logout } = useAuth();
	const nav = useNavigate();

	const navClass = ({ isActive }) =>
		`navLink ${isActive ? 'navLinkActive' : ''}`;

	return (
		<header className='navShell'>
			<div className='container navInner'>
				<div className='brand' onClick={() => nav('/')}>
					<span className='logoDot' />
					<span className='brandName'>My Basic Site</span>
					<span className='badge'>MERN starter</span>
				</div>

				<div className='navLinks'>
					<NavLink to='/' className={navClass} end>
						Home
					</NavLink>
					<NavLink to='/about' className={navClass}>
						About
					</NavLink>
					<NavLink to='/contact' className={navClass}>
						Contact
					</NavLink>
					<NavLink to='/donate' className={navClass}>
						Donate
					</NavLink>

					{!loading && !user && (
						<NavLink to='/login' className={navClass}>
							Login
						</NavLink>
					)}

					{!loading && user && (
						<>
							<NavLink to='/profile' className={navClass}>
								Profile
							</NavLink>
							<button className='btn btnGhost' onClick={logout}>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
