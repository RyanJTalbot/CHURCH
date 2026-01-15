import React from 'react';

const VIDEOS = [
	{
		title: 'Sunday Service (Example)',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	},
	{
		title: 'Worship Set (Example)',
		url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
	},
	{
		title: 'Message Clip (Example)',
		url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
	},
];

// Convert YouTube watch/share urls to an embed URL
function toEmbedUrl(url) {
	try {
		const u = new URL(url);

		// youtu.be/<id>
		if (u.hostname.includes('youtu.be')) {
			const id = u.pathname.replace('/', '');
			return `https://www.youtube.com/embed/${id}`;
		}

		// youtube.com/watch?v=<id>
		if (u.hostname.includes('youtube.com')) {
			const id = u.searchParams.get('v');
			if (id) return `https://www.youtube.com/embed/${id}`;

			// already embed
			if (u.pathname.startsWith('/embed/')) return url;
		}
	} catch {
		// ignore
	}
	return url; // fallback
}

export default function Videos() {
	return (
		<div className='container' style={{ paddingTop: 40, paddingBottom: 40 }}>
			<h1 className='pageTitle'>Videos</h1>
			<p className='pageSubtitle'>
				Watch recent services, worship, and messages.
			</p>

			<div className='videoGrid'>
				{VIDEOS.map((v) => (
					<div key={v.url} className='card videoCard'>
						<div className='videoFrame'>
							<iframe
								src={toEmbedUrl(v.url)}
								title={v.title}
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								allowFullScreen
								loading='lazy'
							/>
						</div>
						<div style={{ marginTop: 10, fontWeight: 600 }}>{v.title}</div>
					</div>
				))}
			</div>
		</div>
	);
}
