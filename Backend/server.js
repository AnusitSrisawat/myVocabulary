const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myvocabulary', //
})

app.get('/', (re, res) => {
    return res.json("from backend side")
})

// Get all word
app.get('/api/words', (re, res) => {
    const sql = "SELECT * FROM words where 1";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

// Get a word by ID
app.get('/api/words/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM words WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: 'Word not found' });
        return res.json(data[0]);
    });
});

// Search words
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.term;
    const sql = "SELECT * FROM words WHERE in_thai LIKE ? OR in_english LIKE ? OR in_japanese LIKE ?";
    const searchPattern = `%${searchTerm}%`;
    db.query(sql, [searchPattern, searchPattern, searchPattern], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add word
app.post('/api/words/add', async (req, res) => {
    try {
        const { inThai, inEnglish, inJapanese, wordType } = req.body;

        // Insert the data into the database
        await db.query('INSERT INTO words (in_thai, in_english, in_japanese, word_type) VALUES (?, ?, ?, ?)', [inThai, inEnglish, inJapanese, wordType]);

        res.status(201).json({ message: 'Word added successfully' });
    } catch (error) {
        console.error('Error adding word:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Delete word
app.delete('/api/words/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the word from the database based on the provided ID
        await db.query('DELETE FROM words WHERE id = ?', [id]);

        res.status(200).json({ message: 'Word deleted successfully' });
    } catch (error) {
        console.error('Error deleting word:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(8081, () => {
    console.log("listening...");
})