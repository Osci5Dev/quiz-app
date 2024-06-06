const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

function getRandomQuestions() {
    const data = fs.readFileSync(path.join(__dirname, 'questions.txt'), 'utf8');
    const questions = data.split('\n').filter(q => q.trim().length > 0).map(q => JSON.parse(q));
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

app.get('/questions', (req, res) => {
    res.json(getRandomQuestions());
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
