import express from 'express';
import dotenv from 'dotenv';
import { getMongoClient, closeConnection } from './db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const mongoClient = await getMongoClient();
  const db = mongoClient.db(process.env.MONGO_DB);
  const collection = db.collection(process.env.MONGO_COLLECTION);
  try {
    let data = await collection.find({}).toArray();
    res.status(200).send(`
      <html>
        <body>
          <h2>Bollywood Actors:</h2>
          <div id="actors-list">
            ${data.map(item => `<div>${item.name}</div>`).join('')}
          </div>
          <h3>Add Actor</h3>
          <form id="add-actor-form">
            <input type="text" id="actor-name" name="name" placeholder="Actor Name" required />
            <button type="submit">Add</button>
          </form>
          <script>
            document.getElementById('add-actor-form').addEventListener('submit', async function(e) {
              e.preventDefault();
              const name = document.getElementById('actor-name').value;
              if (!name) return;
              const res = await fetch('/actors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
              });
              if (res.ok) {
                location.reload();
              } else {
                alert('Failed to add actor');
              }
            });
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    return res.status(500).send('Error fetching data from MongoDB');
  }
});

// API to add a new actor
app.post('/actors', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Actor name is required' });
  }
  const mongoClient = await getMongoClient();
  const db = mongoClient.db(process.env.MONGO_DB);
  const collection = db.collection(process.env.MONGO_COLLECTION);
  try {
    const result = await collection.insertOne({ name });
    res.status(201).json({ message: 'Actor added', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Error saving actor to MongoDB' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add shutdown handlers
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Closing connections...');
    await closeConnection();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing connections...');
    await closeConnection();
    process.exit(0);
});