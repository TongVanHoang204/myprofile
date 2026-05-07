const express = require('express');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const app = express();
const port = 8888;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8888/callback';

app.get('/login', (req, res) => {
  const scope = 'user-read-currently-playing user-read-recently-played';
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    return res.send('No code provided');
  }

  try {
    const params = new URLSearchParams({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token } = response.data;
    
    res.send(`
      <h1>Authentication Successful!</h1>
      <p>Please copy the refresh token below and add it to your .env file as SPOTIFY_REFRESH_TOKEN:</p>
      <textarea rows="5" cols="80">${refresh_token}</textarea>
      <p>After updating the .env file, you can close this window and stop the script.</p>
    `);
  } catch (error) {
    res.send(`Error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Open http://127.0.0.1:${port}/login in your browser to authenticate with Spotify`);
});
