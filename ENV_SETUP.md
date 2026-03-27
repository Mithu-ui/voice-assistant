# Environment Variables Setup

## Setting up OPENAI_API_KEY on Netlify

### Method 1: Via Netlify Dashboard (Recommended)

1. **Go to your site on Netlify**
   - Visit https://app.netlify.com
   - Select your site

2. **Navigate to Environment Variables**
   - Click: **Site Settings** (top menu)
   - Click: **Build & Deploy** → **Environment** (left sidebar)

3. **Add the Variable**
   - Click: **Edit variables** button
   - Click: **New variable** 
   - Enter:
     - **Key:** `OPENAI_API_KEY`
     - **Value:** `sk-proj-XXXXXXXX...` (your actual API key from OpenAI)
   - Click: **Create variable**

4. **Redeploy**
   - Go to **Deployments** tab
   - Click: **Trigger deploy** → **Deploy site**

### Method 2: Via Netlify CLI

```bash
netlify env:set OPENAI_API_KEY sk-proj-XXXXXXXX...
```

### Method 3: Manually in netlify.toml (NOT RECOMMENDED - Security Risk)

⚠️ **DO NOT DO THIS** - It will expose your API key publicly!

---

## Getting Your OpenAI API Key

1. Go to https://platform.openai.com/account/api-keys
2. Click **"Create new secret key"**
3. Copy the key (you can only see it once!)
4. The key starts with `sk-proj-`

---

## Verifying the Setup

After setting the environment variable and redeploying:

1. **Check in browser DevTools**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Send a message
   - Look for success or error messages

2. **Look for these signs of success**
   - ✅ Bot responds with AI messages
   - ✅ Status shows "✓ Response received"
   - ✅ No "API key not configured" errors

3. **Check for these errors**
   - ❌ "API key not configured" = Need to set OPENAI_API_KEY
   - ❌ "OpenAI API error" = API key might be invalid
   - ❌ Network error = Check internet connection

---

## Netlify Environment Scopes

You can set different values per deployment type:

### Production
- Set OPENAI_API_KEY for live site deployments

### Preview/Branch Deploys
- Can use same or different API key for testing

### Local Development
- Create a `.env.local` file (won't be committed):
  ```
  OPENAI_API_KEY=your_test_key_here
  ```

---

## Security Best Practices

✅ **DO:**
- Use environment variables (never hardcode API keys)
- Rotate API keys regularly
- Use Netlify's secrets management
- Set usage limits on your OpenAI account

❌ **DON'T:**
- Commit API keys to GitHub
- Share API keys in messages or tickets
- Use the same API key across multiple projects
- Leave API keys visible in browser console logs (watch for this in logs)

---

## Troubleshooting

**API Key not working?**
1. Verify it's the complete key (should start with `sk-proj-`)
2. Check OpenAI dashboard for any restrictions
3. Ensure account has available credits
4. Wait 1 minute after setting the variable before testing

**Still seeing errors?**
1. Redeploy the entire site with **Trigger deploy**
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check Netlify function logs: **Site Settings → Functions → Logs**
4. Check OpenAI API status: https://status.openai.com
