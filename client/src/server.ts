import express from 'express';
import { Surreal, SurrealDB } from 'surrealdb.js';

const app = express();
app.use(express.json());

const port = 3000;

async function connectToSurrealDB(): Promise<Surreal> {
    const db = new Surreal();
    try {
        await db.connect('http://surreal.orizuro.eu/rpc', {
            namespace: 'test',
            database: 'testdb',
            auth: {
                username: 'root',
                password: 'root',
            },
        });
        return db;
    } catch (error) {
        console.error('Failed to connect to SurrealDB:', error);
        throw error;
    }
}

app.get('/api/alunos', async (req, res) => {
    try {
        const db = await connectToSurrealDB();
        const result = await db.query('SELECT * FROM aluno;');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

