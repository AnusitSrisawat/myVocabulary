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

app.get('/api/words', (re, res) => {
    const sql = "SELECT * FROM words where 1";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/words/add', async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { inThai, inEnglish, inJapanese, wordType } = req.body;

        // Insert the data into the database
        await db.query('INSERT INTO words (in_thai, in_english, in_japanese, word_type) VALUES (?, ?, ?, ?)', [inThai, inEnglish, inJapanese, wordType]);

        res.status(201).json({ message: 'Word added successfully' });
    } catch (error) {
        console.error('Error adding word:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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