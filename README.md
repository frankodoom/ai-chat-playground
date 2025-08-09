# AI Chat Playground

A modern, extensible chat interface for testing and comparing different AI language models.

## Features

- 🤖 Support for multiple AI models (GPT-4, Claude, Gemini)
- 💬 Real-time streaming responses
- 🎨 Beautiful UI with dark/light theme support
- ⚙️ Customizable model parameters
- 📝 Markdown rendering with syntax highlighting
- 💾 Conversation history management
- 📊 Token usage tracking
- 🔐 Secure API key management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for the AI services you want to use

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-chat-playground
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── ...          # Feature components
├── lib/             # Utility functions
├── store/           # Zustand state management
└── types/           # TypeScript type definitions
```

## API Integration

To connect to real AI APIs, implement the API routes in `/app/api/chat/route.ts`:

```typescript
// Example implementation
import { OpenAI } from 'openai';

export async function POST(req: Request) {
  const { message, model } = await req.json();
  
  // Add your API logic here
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: message }],
    stream: true,
  });
  
  return new Response(response);
}
```

## Customization

### Adding New Models

1. Update the model list in `src/components/sidebar.tsx`
2. Add API integration in `/app/api/chat/route.ts`
3. Update the store if needed in `src/store/chat-store.ts`

### Styling

The project uses Tailwind CSS with a custom theme. Modify the theme in:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles and CSS variables

## Deployment

### Deploy to Vercel

```bash
npm run build
vercel deploy
```

### Deploy to other platforms

Build the production version:
```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
