import { tokenStorage } from './authApi';

const BASE = 'http://localhost:5262/api/conversations';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${tokenStorage.get()}`,
});

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export const api = {
  getAll: (): Promise<Conversation[]> =>
    fetch(BASE, { headers: authHeaders() }).then((r) => r.json()),

  create: (title?: string): Promise<Conversation> =>
    fetch(BASE, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ title: title ?? null }),
    }).then((r) => r.json()),

  sendMessage: (id: string, content: string): Promise<{ userMessage: Message; botReply: Message }> =>
    fetch(`${BASE}/${id}/messages`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ content }),
    }).then((r) => r.json()),

  delete: (id: string): Promise<void> =>
    fetch(`${BASE}/${id}`, { method: 'DELETE', headers: authHeaders() }).then(() => undefined),
};
