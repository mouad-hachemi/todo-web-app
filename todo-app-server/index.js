import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

// Middleware.
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Endpoints.
// Regiser User.
app.post("/sign-up", async (req, res) => {
    try {
        const { fullName, username, password } = req.body;
        const foundUser = await pool.query("SELECT * FROM users WHERE username = $1;", [username]);
        if (foundUser.rowCount >= 1) {
            return res.status(400).json("Username already used.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3) RETURNING *",
            [fullName, username, hashedPassword]
        );
        return res.status(201).json(result.rows[0])
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

// Log in.
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE username = $1;", [username]);
        if (user.rowCount < 1) {
            return res.status(400).json("User not found.");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json("Invalid Password.");
        }
        const token = jwt.sign(
            { id: user.rows[0].user_id, username: user.rows[0].username, fullName: user.rows[0].full_name },
            'todo@app.secret',
            { expiresIn: '1h' }
        );
        return res.status(201).json(token);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Home (Get all tasks).
app.get("/all-tasks", authenticateToken, async (req, res) => {
    try {
        const { id, username, fullName } = req.user;
        const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY is_done ASC", [id]);
        return res.status(201).json({ tasks: tasks.rows, username, fullName });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Server didn't respond.");
    }
});


// Get today tasks.
app.get("/today-tasks", authenticateToken, async (req, res) => {
    try {
        const { id, username, fullName } = req.user;
        const tasks = await pool.query(
            "SELECT * FROM tasks WHERE user_id = $1 AND created_on = CURRENT_DATE ORDER BY is_done ASC", [id]
        );
        return res.status(201).json({ tasks: tasks.rows, username, fullName });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Create Todo.
app.post("/create-task", authenticateToken, async (req, res) => {
    try {
        const { content } = req.body;
        const { id } = req.user;
        const newTask = await pool.query("INSERT INTO tasks (user_id, content) VALUES ($1, $2)", [id, content]);
        return res.status(201).json(newTask.rows);
    } catch (error) {
        return res.status(500).json("Server Error");
    }
});

// Mark task as done.
app.put('/task-done/:task_id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const taskId = req.params.task_id;
        const { doneFlag } = req.body;
        const updatedTask = await pool.query(
            "UPDATE tasks SET is_done = $1 WHERE task_id = $2 AND user_id = $3 RETURNING *", [doneFlag, taskId, id]
        );
        return res.status(201).json(updatedTask.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Server Error.");
    }
});

// Remove task.
app.delete("/task-remove/:task_id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const taskId = req.params.task_id;
        await pool.query("DELETE FROM tasks WHERE task_id = $1 AND user_id = $2", [taskId, id]);
        return res.status(201).json(`Task ${taskId} deleted`);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Server Error");
    }
});

// Edit task.
app.put('/task-edit/:task_id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        const taskId = req.params.task_id;
        const { content } = req.body;
        await pool.query("UPDATE tasks SET content = $1 WHERE task_id = $2 AND user_id = $3", [content, taskId, id]);
        return res.status(201).json("Updated taks successfully");
    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Server Error");
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // Get authorization field.
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token.

    if (!token) {
        return res.status(401).json("Access Denied");
    }

    jwt.verify(token, 'todo@app.secret', (err, user) => {
        if (err) {
            return res.status(403).json('Invalid Credentials');
        }
        req.user = user;
        next();
    });

}

// Start server.
app.listen(PORT, (err) => {
    console.log("Server listening on port:" + PORT);
});