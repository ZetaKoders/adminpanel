import { Surreal } from 'surrealdb.js';
import type {evento} from '~/models/types';

class EventData {
    private db: Surreal;

    constructor() {
        this.db = new Surreal();
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        try {
            await this.db.connect('wss://surreal.orizuro.eu/rpc', {
                namespace: 'teste',
                database: 'testeadmin',
                auth: {
                    username: 'admin',
                    password: 'admin',
                },
            });
        } catch (error) {
            console.error('Failed to connect to database:', error);
        }
    }

    getAll = async () => {
        try {
            const result = await this.db.query<evento[]>('SELECT * FROM event');
            console.log('result', result);
            return result;
        } catch (error) {
            console.error('Failed to fetch eventos:', error);
            return [];
        }
    }

    get = async (id: string) => {
        try {
            const result = await this.db.select<evento>(id);
            console.log('result', result);
            return result[0] as evento;
        } catch (error) {
            console.error(`Failed to fetch aluno with id ${id}:`, error);
            return {} as evento;
        }
    }

    create = async (evento: evento) => {
        try {
            const result = await this.db.insert<evento>('event', evento);
            return result;
        } catch (error) {
            console.error('Failed to create evento:', error);
        }
    }

    update = async (evento: evento) => {
        try {
            const result = await this.db.update<evento>('event', evento);
            return result;
        } catch (error) {
            console.error(`Failed to update evento with id ${evento.id}:`, error);
        }
    }

    delete = async (id: string) => {
        try {
            const result = await this.db.query(`DELETE '${id}'`);
            return result;
        } catch (error) {
            console.error(`Failed to delete evento with id ${id}:`, error);
        }
    }
}

const EventoData = new EventData();
export { EventoData };
