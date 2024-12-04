import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import studentRoutes from "./routes/students.js";
import courseRoutes from "./routes/courses.js";
import taskRoutes from "./routes/tasks.js";
import authRoutes from './routes/auth.js';
import passport from "passport";
import "./config/passport.js";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize()); // Make sure passport is initialized here

// Routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes); // Authentication routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

// Root Route (Authentication Status Display)
app.get("/", (req, res) => {
  const isAuthenticated = req.user ? "Logged in" : "Not logged in";
  res.send(`
    <h1>Welcome to the Student-Course Application API!</h1>

    <h2>API Endpoints</h2>
    <ul>
        <li><strong>Retrieve all students:</strong> 
            <br>GET <code>http://localhost:${PORT}/students</code>
            <br>Example: <a href="http://localhost:${PORT}/students">http://localhost:${PORT}/students</a>
        </li>
        
        <li><strong>Retrieve a student by ID:</strong> 
            <br>GET <code>http://localhost:${PORT}/students/:id</code>
            <br>Example: <a href="http://localhost:${PORT}/students/1">http://localhost:${PORT}/students/1</a>
        </li>
        
        <li><strong>Retrieve all courses:</strong> 
            <br>GET <code>http://localhost:${PORT}/courses</code>
            <br>Example: <a href="http://localhost:${PORT}/courses">http://localhost:${PORT}/courses</a>
        </li>
        
        <li><strong>Add a new course:</strong> 
            <br>POST <code>http://localhost:${PORT}/courses</code>
            <br>Example JSON Body:
            <pre>{
    "id": 4,
    "name": "Physics",
    "department": "Science",
    "isOpen": true
}</pre>
        </li>
    </ul>

    <h2>Authentication</h2>
    <p>To test authentication functionality, use the following links:</p>
    <ul>
        <li><a href="/auth/register">Register</a></li>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/logout">Logout</a></li>
    </ul>

    <h2>Instructions</h2>
    <p>To test POST requests, use an API client like <strong>Postman</strong> or <strong>curl</strong> to send JSON data in the request body.</p>
    <p>Use GET requests in your browser to view data directly by navigating to the URLs above.</p>
    
    <h2>Using Postman to Add a Course</h2>
    <ol>
        <li>Open Postman and click <strong>New Request</strong>.</li>
        <li>Set the request type to <strong>POST</strong>.</li>
        <li>Enter the URL: <code>http://localhost:${PORT}/courses</code></li>
        <li>Go to the <strong>Body</strong> tab, select <strong>raw</strong>, and choose <strong>JSON</strong> as the format.</li>
        <li>Enter the JSON data for the new course in the text area. For example:
            <pre>{
    "id": 4,
    "name": "Physics",
    "department": "Science",
    "isOpen": true
}</pre>
        </li>
        <li>Click <strong>Send</strong> to submit the request. You should receive a response confirming the course was added successfully.</li>
    </ol>
  `);
});

// Catch-all Route for Undefined Paths
app.use((req, res, next) => {
  res.status(404).json({ message: "The requested route does not exist" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);  // Log the error
  res.status(500).json({ message: "Internal Server Error" });  // Respond with an error message
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});