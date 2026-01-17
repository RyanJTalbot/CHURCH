import React from 'react';
import { NavLink } from 'react-router-dom';

function TopLink({ to, children, className = '' }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`navTopLink ${isActive ? 'active' : ''} ${className}`.trim()
			}
			end
		>
			{children}
		</NavLink>
	);
}

export default function Navbar() {
	return (
		<header className='navWrap'>
			{/* Top bar */}
			<div className='navTop'>
				<div className='navInner'>
					<div className='brand'>
						<NavLink to='/' className='brand' aria-label='Go to home'>
							<div className='brandMark'>RT</div>
							<div className='brandText'>
								<div className='brandName'>CHURCH OF THE FUTURE</div>
								<div className='brandSub'>MINISTRIES</div>
							</div>
						</NavLink>
					</div>

					<nav className='navTopLinks' aria-label='Primary'>
						<TopLink to='/about'>About</TopLink>
						<TopLink to='/videos'>Watch</TopLink>
						<TopLink to='/inspiration'>Inspiration</TopLink>
						<TopLink to='/contact'>Community</TopLink>
						<TopLink to='/donate' className='donateLink'>
							Donate
						</TopLink>
					</nav>
				</div>
			</div>

			{/* Bottom bar */}
			<div className='navBottom'>
				<div className='navInner navBottomInner'>
					<div className='navSpacer' />

					<div className='navIcons' aria-label='Utility'>
						<NavLink
							to='/search'
							className='navIconBtn'
							title='Search'
							aria-label='Search'
						>
							🔍
						</NavLink>

						<NavLink
							to='/cart'
							className='navIconBtn'
							title='Cart'
							aria-label='Cart'
						>
							🛒
							<span className='navBadge'>0</span>
						</NavLink>

						<NavLink
							to='/login'
							className='navIconBtn'
							title='Account'
							aria-label='Account'
						>
							👤
						</NavLink>
					</div>
				</div>
			</div>
		</header>
	);
}
