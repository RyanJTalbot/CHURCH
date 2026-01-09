import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Donate from './pages/Donate.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Register from './pages/Register.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from './AuthContext.jsx';

export default function App() {
	return (
		<AuthProvider>
			<div
				style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
			>
				<Navbar />
				<main
					style={{
						flex: 1,
						padding: '24px',
						maxWidth: 900,
						width: '100%',
						margin: '0 auto',
					}}
				>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/donate' element={<Donate />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='/profile'
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route path='*' element={<div>404 — Page not found</div>} />
						<Route path='/verify-email' element={<VerifyEmail />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</AuthProvider>
	);
}
