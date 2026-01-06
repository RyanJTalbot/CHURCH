import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { apiGet, apiPost } from './api.js';
import { clearToken, getToken, setToken } from './auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function refreshMe() {
		const token = getToken();
		if (!token) {
			setUser(null);
			setLoading(false);
			return;
		}

		try {
			const data = await apiGet('/api/auth/me');
			setUser(data.user);
		} catch {
			clearToken();
			setUser(null);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		refreshMe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function login(email, password) {
		const data = await apiPost('/api/auth/login', { email, password });
		setToken(data.token);
		setUser(data.user);
	}

	function logout() {
		clearToken();
		setUser(null);
	}

	const value = useMemo(
		() => ({ user, loading, login, logout, refreshMe }),
		[user, loading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
