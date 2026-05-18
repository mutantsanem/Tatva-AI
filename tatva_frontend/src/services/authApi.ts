const BASE = 'http://localhost:5262/api/auth';

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
}

export const authApi = {
  register: (name: string, email: string, password: string): Promise<string> =>
    fetch(`${BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
      return r.text();
    }),

  login: (email: string, password: string): Promise<AuthResponse> =>
    fetch(`${BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    }),
};

export const tokenStorage = {
  get: () => localStorage.getItem('token'),
  set: (token: string) => localStorage.setItem('token', token),
  clear: () => localStorage.removeItem('token'),
};
