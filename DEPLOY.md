# Deploy Guide

## Important

Do not ship `.env` inside your deploy `.zip`.

If a secret is included in the archive, it is not hidden. It is only stored in plain text inside the package.

## Create a safe deploy zip

Run:

```powershell
npm run package:deploy
```

The archive will be created in `dist/` and excludes:

- `.env`
- any `.env.*` file except `.env.example`
- `.next`
- `node_modules`
- local logs and local build artifacts

## Deploy on server

1. Upload and extract the generated `.zip`.
2. Copy `.env.example` to `.env` on the server.
3. Fill in the real production secrets on the server:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_API_URL`
   - `OPENROUTER_MODEL`
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
   - SMTP credentials if you use SMTP
4. Install dependencies:

```powershell
npm install
```

5. Build and start:

```powershell
npm run build
npm run start
```

## Best practice

The safest option is to store secrets in your hosting control panel or server environment variables instead of keeping them in a file.
