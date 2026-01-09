import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const saved = localStorage.getItem('auth');
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				setUser(parsed.user);
				setToken(parsed.token);
			} catch {
				localStorage.removeItem('auth');
			}
		}
	}, []);

	function loginWithToken(token, user) {
		setToken(token);
		setUser(user);
		localStorage.setItem('auth', JSON.stringify({ token, user }));
	}

	function logout() {
		setToken(null);
		setUser(null);
		localStorage.removeItem('auth');
	}

	return (
		<AuthContext.Provider value={{ user, token, loginWithToken, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
