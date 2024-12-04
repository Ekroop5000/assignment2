import express from 'express';
import User from '../models/User.js';
import cookieParser from 'cookie-parser';

const router = express.Router();

// Middleware to parse cookies
router.use(cookieParser());

// Render Registration Form
router.get('/register', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Register</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
          form { max-width: 400px; margin: auto; padding: 20px; background-color: white; border-radius: 8px; }
          input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
          button { width: 100%; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
          button:hover { background-color: #45a049; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center;">Register</h2>
        <form action="/auth/register" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </body>
    </html>
  `);
});

// Render Login Form
router.get('/login', (req, res) => {
  const message = req.query.message || ''; // Get any message from query params (e.g., success or failure)
  const isLoggedIn = req.cookies.username; // Check if user is logged in using cookies
  
  res.send(`
    <html>
      <head>
        <title>Login</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: white; }
          form { max-width: 400px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; }
          input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
          button { width: 100%; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
          button:hover { background-color: #45a049; }
          h1 { text-align: center; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center;">Login</h2>
        <form action="/auth/login" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        ${message ? `<h1 style="text-align: center; color: ${message.includes('success') ? 'green' : 'red'};">${message}</h1>` : ''}
        <div style="text-align: center;">
          ${isLoggedIn ? '<h1>You are logged in!</h1>' : ''}
          <a href="/auth/logout"><button type="button">Logout</button></a>
          <a href="/"><button type="button">Homepage</button></a>
        </div>
      </body>
    </html>
  `);
});

// Handle Registration Form Submission
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/auth/login');  // Redirect to the login page after successful registration
    return; // Ensure no further code is executed after the redirect
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Handle Login Form Submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      // Send the "User not found" message on a white page and return to prevent further code execution
      return res.setHeader('Content-Type', 'text/html').send(`
        <html>
          <body style="background-color: white; font-family: Arial, sans-serif;">
            <h1 style="text-align: center;">Login failed: User not found</h1>
          </body>
        </html>
      `);
    }

    const isMatch = await user.comparePassword(password); // Assume this method exists
    if (!isMatch) {
      // Send the "Invalid password" message on a white page and return to prevent further code execution
      return res.setHeader('Content-Type', 'text/html').send(`
        <html>
          <body style="background-color: white; font-family: Arial, sans-serif;">
            <h1 style="text-align: center;">Login failed: Invalid password</h1>
          </body>
        </html>
      `);
    }

    // Set cookie to remember the user as logged in
    res.cookie('username', username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Cookie expires in 1 day

    // Send the "Login successful" message on a white page
    res.setHeader('Content-Type', 'text/html').send(`
      <html>
        <body style="background-color: white; font-family: Arial, sans-serif;">
          <h1 style="text-align: center;">Login successful. Please send credentials with each request.</h1>
          <div style="text-align: center;">
            <a href="/auth/logout"><button type="button">Logout</button></a>
            <a href="/"><button type="button">Homepage</button></a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    // Send a generic error message on a white page in case of an error
    res.setHeader('Content-Type', 'text/html').send(`
      <html>
        <body style="background-color: white; font-family: Arial, sans-serif;">
          <h1 style="text-align: center;">Login failed: ${error.message}</h1>
        </body>
      </html>
    `);
  }
});

// Logout Endpoint
router.get('/logout', (req, res) => {
  // Clear the username cookie on logout
  res.clearCookie('username');
  
  // Send a success message on a white page for successful logout
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <body style="background-color: white; font-family: Arial, sans-serif;">
        <h1 style="text-align: center;">You logged out successfully!</h1>
        <div style="text-align: center;">
          <a href="/"><button type="button">Homepage</button></a>
        </div>
      </body>
    </html>
  `);
});

export default router;