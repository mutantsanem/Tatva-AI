<img width="1346" height="761" alt="image" src="https://github.com/user-attachments/assets/9b03c618-3118-4250-bc09-d75bcac44669" />

# Tatva AI

A full-stack AI chat application built with React and .NET, powered by Groq's LLaMA 3.3 70B model.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Tailwind CSS
- Atomic Design Architecture (atoms → molecules → organisms → templates → pages)

**Backend**
- .NET 10 Web API
- In-memory conversation store
- Groq API (LLaMA 3.3 70B) for AI responses

## Getting Started

### Backend
1. Copy `appsettings.example.json` to `appsettings.json`
2. Add your Groq API key from [console.groq.com](https://console.groq.com)
3. Run:
   ```bash
   cd tatva_ai_backend
   dotnet run

