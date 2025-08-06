import { MongoClient } from 'mongodb';

let client = null;

export async function getMongoClient() {
    if (client && client.topology && client.topology.isConnected()) {
        return client;
    }

    // Construct the URI from individual environment variables
    const user = encodeURIComponent(process.env.MONGO_USER);
    const password = encodeURIComponent(process.env.MONGO_PASSWORD);
    const host = process.env.MONGO_HOST;
    const db = process.env.MONGO_DB;
    
    const mongoURI = `mongodb://${user}:${password}@${host}:27017/${db}?authSource=admin`;

    console.log(`Attempting to connect to MongoDB with URI: mongodb://<user>:<password>@${host}:27017/${db}?authSource=admin`);

    client = new MongoClient(mongoURI, {
        maxPoolSize: 10,
        minPoolSize: 5,
        maxIdleTimeMS: 60000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 45000
    });
    
    await client.connect();
    console.log('MongoDB pool initialized');
    return client;
}

export async function closeConnection() {
    if (client) {
        await client.close();
        client = null;
    }
}