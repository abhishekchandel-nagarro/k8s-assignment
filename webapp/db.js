import { MongoClient } from 'mongodb';

let client = null;

export async function getMongoClient() {
    if (client && client.topology && client.topology.isConnected()) {
        return client;
    }
    
    client = new MongoClient(process.env.MONGO_URI, {
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