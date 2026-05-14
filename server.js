const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(UPLOADS_DIR));

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

    db.run(`CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        subcategory TEXT,
        file_path TEXT NOT NULL,
        originalname TEXT NOT NULL,
        mimetype TEXT NOT NULL,
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

// Endpoints para documentos
app.get('/api/documents', (req, res) => {
    const { category, subcategory } = req.query;
    let query = 'SELECT id, category, subcategory, file_path, originalname, mimetype, created_at FROM documents';
    let params = [];
    
    if (category) {
        query += ' WHERE category = ?';
        params.push(category);
        if (subcategory) {
            query += ' AND subcategory = ?';
            params.push(subcategory);
        }
    }
    
    query += ' ORDER BY created_at DESC';
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/documents', upload.single('file'), (req, res) => {
    const { category, subcategory } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }
    
    const filePath = '/uploads/' + req.file.filename;
    
    db.run(
        'INSERT INTO documents (category, subcategory, file_path, originalname, mimetype) VALUES (?, ?, ?, ?, ?)',
        [category || null, subcategory || null, filePath, req.file.originalname, req.file.mimetype],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ 
                    id: this.lastID, 
                    category, 
                    subcategory, 
                    file_path: filePath,
                    originalname: req.file.originalname, 
                    mimetype: req.file.mimetype 
                });
            }
        }
    );
});

app.get('/api/documents/:id/download', (req, res) => {
    db.get('SELECT * FROM documents WHERE id = ?', [req.params.id], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        
        const fullPath = path.join(__dirname, row.file_path);
        res.download(fullPath, row.originalname);
    });
});

app.delete('/api/documents/:id', (req, res) => {
    db.get('SELECT file_path FROM documents WHERE id = ?', [req.params.id], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        
        const fullPath = path.join(__dirname, row.file_path);
        fs.unlink(fullPath, (unlinkErr) => {
            db.run('DELETE FROM documents WHERE id = ?', [req.params.id], function(deleteErr) {
                if (deleteErr) {
                    res.status(500).json({ error: deleteErr.message });
                } else {
                    res.json({ deleted: true });
                }
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});