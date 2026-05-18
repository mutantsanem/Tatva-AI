export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export const conversations: Conversation[] = [
  {
    id: '1',
    title: 'What is React?',
    messages: [
      { id: 'm1', role: 'user', content: 'What is React?' },
      { id: 'm2', role: 'assistant', content: 'React is a JavaScript library for building user interfaces, developed by Meta. It uses a component-based architecture and a virtual DOM for efficient rendering.' },
      { id: 'm3', role: 'user', content: 'What are hooks?' },
      { id: 'm4', role: 'assistant', content: 'Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and useRef.' },
    ],
  },
  {
    id: '2',
    title: 'Explain Tailwind CSS',
    messages: [
      { id: 'm5', role: 'user', content: 'Explain Tailwind CSS' },
      { id: 'm6', role: 'assistant', content: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup without writing custom CSS.' },
    ],
  },
  {
    id: '3',
    title: 'TypeScript vs JavaScript',
    messages: [
      { id: 'm7', role: 'user', content: 'TypeScript vs JavaScript — which should I use?' },
      { id: 'm8', role: 'assistant', content: 'TypeScript is a superset of JavaScript that adds static typing. For large projects or teams, TypeScript is recommended as it catches errors at compile time and improves IDE support.' },
    ],
  },
  {
    id: '4',
    title: 'How does async/await work?',
    messages: [
      { id: 'm9', role: 'user', content: 'How does async/await work?' },
      { id: 'm10', role: 'assistant', content: 'async/await is syntactic sugar over Promises. An async function always returns a Promise, and await pauses execution inside the function until the Promise resolves, making async code read like synchronous code.' },
    ],
  },
];
