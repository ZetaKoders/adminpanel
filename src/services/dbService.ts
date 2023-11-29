// src/services/dbService.ts
import { Surreal } from 'surrealdb.js';

const db = new Surreal();

export const connectToDatabase = async () => {


    //TODO: Add a check to see if the db is already connected



    await db.connect('wss://surreal.orizuro.eu/rpc', {
			// Set the namespace and database for the connection
			namespace: 'teste',
			database: 'testedb',

			// Set the authentication details for the connection
			auth: {
				namespace: 'teste',
				database: 'testedb',
				username: 'admin',
				password: 'admin',
			},
			
		});

    return db;
};
