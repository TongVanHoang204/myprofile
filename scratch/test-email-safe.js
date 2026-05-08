const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testEmail() {
  console.log('--- SMTP Test Script (Safe Version) ---');
  
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT === '465',
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER
  };

  console.log('Config detected:');
  console.log('- User:', config.user);
  console.log('- To:', config.to);
  console.log('- OAuth2 Credentials Present:', Boolean(config.clientId && config.clientSecret && config.refreshToken));

  if (!config.clientId || !config.clientSecret || !config.refreshToken) {
    console.error('ERROR: Missing OAuth2 credentials in .env');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      type: 'OAuth2',
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken
    }
  });

  console.log('\nAttempting to send test email...');
  
  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject: 'Final Verification Test',
      text: 'Final check of the SMTP configuration.',
      html: '<b>Success!</b> Everything is configured correctly in your .env file.'
    });

    console.log('SUCCESS! Email sent.');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('\nFAILED:');
    console.error(error.message);
  }
}

testEmail();
