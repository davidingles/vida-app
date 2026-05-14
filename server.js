const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database('./vida.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

function initDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        subcategory TEXT,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

app.get('/api', (req, res) => {
    db.all('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api', (req, res) => {
    const { category, subcategory, text } = req.body;
    if (!category || !text) {
        return res.status(400).json({ error: 'Category and text are required' });
    }
    
    const stmt = subcategory 
        ? 'INSERT INTO tasks (category, subcategory, text) VALUES (?, ?, ?)'
        : 'INSERT INTO tasks (category, text) VALUES (?, ?)';
    
    const params = subcategory ? [category, subcategory, text] : [category, text];
    
    db.run(stmt, params, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, category, subcategory, text, completed: 0 });
        }
    });
});

app.put('/api/:id', (req, res) => {
    const { completed } = req.body;
    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ changes: this.changes });
        }
    });
});

app.delete('/api/:id', (req, res) => {
    db.run('DELETE FROM tasks WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ deleted: this.changes > 0 });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});