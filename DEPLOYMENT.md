# 🎤 AI Voice Agent - Deployment Guide

## Overview
This is an interactive AI voice agent with real-time chat, text input, and voice synthesis using OpenAI's GPT model.

## Features
✅ Voice input with automatic speech recognition
✅ Text chat input with send button
✅ AI responses using ChatGPT (gpt-4o-mini)
✅ Text-to-speech output
✅ Real-time status updates
✅ Error handling & API validation
✅ Responsive mobile design

## Prerequisites
- Node.js (for local development)
- OpenAI API key ([Get one here](https://platform.openai.com/account/api-keys))
- Netlify account for deployment

## Local Development

1. **Clone the repository**
```bash
cd voice-agent-main
```

2. **Install dependencies** (optional, for Netlify CLI)
```bash
npm install -g netlify-cli
```

3. **Run locally**
```bash
netlify dev
```
This starts the development server at http://localhost:8000

## Deployment to Netlify

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Update voice agent with interactive chat"
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Click "New site from Git"
3. Select your GitHub repository
4. Deploy

### Step 3: Set Environment Variables (IMPORTANT!)
1. Go to **Site Settings → Environment** in Netlify
2. Add a new variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key
3. Redeploy the site

### Alternative: Deploy via CLI
```bash
netlify deploy --prod
```

## Environment Variables

The following environment variables must be set:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key (required for API calls) |

**⚠️ Never commit your API key to version control!**

## Testing the API Key

After deployment, test using the browser console:
```javascript
// This will be tested automatically when you send a message
// Check the browser console for API errors
```

## Troubleshooting

### "API key not configured"
- ✓ Check Netlify Site Settings → Environment variables
- ✓ Verify the key is set before deploying
- ✓ Redeploy after adding the variable

### "API request failed" or "OpenAI API error"
- ✓ Verify your OpenAI API key is valid
- ✓ Check if the API key has access to gpt-4o-mini model
- ✓ Ensure your OpenAI account has credits/subscription

### No response from AI
- ✓ Check browser DevTools Console for errors
- ✓ Verify network connection
- ✓ Try reloading the page

### Microphone not working
- ✓ Browser must have microphone permissions
- ✓ Only works in HTTPS (or localhost)
- ✓ Chrome, Edge, Safari, Firefox all supported

## API Endpoint

The chat backend is located at: `/.netlify/functions/chat`

## Files Structure
```
voice-agent-main/
├── index.html          # Main app interface
├── script.js           # Frontend logic & voice handling
├── style.css           # UI styling
├── netlify.toml        # Netlify config
├── netlify/
│   └── functions/
│       └── chat.js     # Backend API handler
└── netlify.toml        # Environment & build config
```

## Support
For OpenAI API issues: [OpenAI Help](https://help.openai.com)
For Netlify issues: [Netlify Docs](https://docs.netlify.com)
