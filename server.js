// server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const pendaftaranRoutes = require('./routes/pendaftaranRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');
const seminarRoutes = require('./routes/seminarRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.use('/api/pendaftaran', pendaftaranRoutes);
app.use('/api/peserta', pesertaRoutes);
app.use('/api/seminar', seminarRoutes);
app.use('/api/user', userRoutes);

db.connect((err) => {
    if (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    } else {
        console.log('Connected to the database');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});
