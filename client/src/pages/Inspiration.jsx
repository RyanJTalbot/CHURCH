import React, { useMemo, useState } from 'react';

export default function Inspiration() {
	const [tab, setTab] = useState('today'); // "month" | "today" | "blogs"
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [notice, setNotice] = useState('');

	const today = useMemo(() => {
		const d = new Date();
		return d.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		setNotice('');

		if (!firstName || !lastName || !email) {
			setNotice('Please fill in First Name, Last Name, and Email.');
			return;
		}

		// For now just a placeholder
		console.log('Inspiration signup:', { firstName, lastName, email });

		setNotice('Thanks! You’re signed up (demo).');
		setFirstName('');
		setLastName('');
		setEmail('');
	}

	return (
		<div className='inspoPage'>
			{/* Tabs strip */}
			<div className='inspoTabs'>
				<div className='container inspoTabsInner'>
					<button
						className={`inspoTab ${tab === 'month' ? 'active' : ''}`}
						onClick={() => setTab('month')}
						type='button'
					>
						THIS MONTH
					</button>
					<button
						className={`inspoTab ${tab === 'today' ? 'active' : ''}`}
						onClick={() => setTab('today')}
						type='button'
					>
						TODAY&apos;S WORD
					</button>
					<button
						className={`inspoTab ${tab === 'blogs' ? 'active' : ''}`}
						onClick={() => setTab('blogs')}
						type='button'
					>
						BLOGS
					</button>
				</div>
			</div>

			{/* Main content */}
			<div className='container inspoMain'>
				{/* Signup header */}
				<div className='inspoSignupHeader'>
					<h1>Have you signed up yet?</h1>
					<p>Get your inspirational message in your inbox every day.</p>
				</div>

				{/* Signup form row */}
				<form className='inspoSignupRow' onSubmit={onSubmit}>
					<div className='inspoField'>
						<label>First Name</label>
						<input
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder='First Name'
						/>
					</div>

					<div className='inspoField'>
						<label>Last Name</label>
						<input
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder='Last Name'
						/>
					</div>

					<div className='inspoField'>
						<label>Email Address</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email Address'
							type='email'
						/>
					</div>

					<button className='inspoSubmit' type='submit'>
						SUBMIT
					</button>
				</form>

				{notice ? <div className='inspoNotice'>{notice}</div> : null}

				{/* Today’s word header row */}
				<div className='inspoSectionTop'>
					<div className='inspoBreadcrumb'>
						<span className='inspoChevron'>‹</span>{' '}
						<span className='inspoCrumb'>TODAY&apos;S WORD</span>
					</div>

					<div className='inspoShare'>
						<span>Share:</span>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share on Facebook'
						>
							f
						</a>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share on X'
						>
							x
						</a>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share on Pinterest'
						>
							p
						</a>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share by Email'
						>
							@
						</a>
					</div>
				</div>

				<div className='inspoTitleBlock'>
					<h2>Stand Firm</h2>
					<div className='inspoDate'>{today}</div>
				</div>

				{/* Hero image section */}
				<div className='inspoHero'>
					<div className='inspoHeroOverlay'>
						<div className='inspoHeroDate'>{today}</div>
						<div className='inspoHeroTitle'>Stand Firm</div>
						<div className='inspoHeroVerse'>
							Be on your guard; stand firm in the faith; be courageous; be
							strong.
							<br />
							<span>1 Corinthians 16:13</span>
						</div>
					</div>
				</div>

				{/* Body */}
				<div className='inspoBody'>
					<div className='inspoShareRow'>
						<span>Share:</span>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share on Facebook'
						>
							f
						</a>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share on X'
						>
							x
						</a>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share on Pinterest'
						>
							p
						</a>
						<a
							href='#'
							onClick={(e) => e.preventDefault()}
							aria-label='Share by Email'
						>
							@
						</a>
					</div>

					<p>
						God has a great plan for your life — something greater than you
						imagined — but that plan won’t come to pass without opposition.
						There will be things you don’t understand, things that are not fair.
						You’ll be tempted to get discouraged and give up. But God doesn’t
						take us in a straight line to our destiny. There will be detours,
						delays, even some dead ends. You’ll come to a Red Sea or face a
						Goliath. Someone walks away, there’s a tough season at work, a child
						gets off course, or a loan doesn’t go through. It seems like a
						setback, but really it’s a setup that will lead you to your destiny.
					</p>

					<p>
						The test is to keep the faith, to keep trusting when you don’t
						understand, to keep believing when all your circumstances say, “It’s
						never going to work out.” It’s knowing that God is on the throne,
						that His plans for you are for good, that what He has purposed for
						your life will come to pass. If you keep the faith, all things, not
						just some things, are going to work together for your good.
					</p>

					<h3>Prayer For Today</h3>
					<p className='inspoPrayer'>
						“Father, thank You for Your promise that You will work out Your
						plans for my life. Help me to stand firm in my faith in the times
						when nothing seems to make sense. I declare that You have never
						failed me in the past, and I know You’re not going to fail me in the
						future. In Jesus’ Name, Amen.”
					</p>
				</div>
			</div>
		</div>
	);
}
