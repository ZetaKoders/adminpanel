import { Surreal } from 'surrealdb.js';
import type { Aluno } from '~/models/types';

class AlunosData {
    private db: Surreal;

    constructor() {
        this.db = new Surreal();
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        try {
            await this.db.connect('wss://surreal.orizuro.eu/rpc', {
                namespace: 'teste',
                database: 'testedb',
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
            const result = await this.db.query<Aluno[]>('SELECT * FROM aluno');
            console.log('result', result);
            return result;
        } catch (error) {
            console.error('Failed to fetch alunos:', error);
            return [];
        }
    }

    get = async (id: string) => {
        try {
            const result = await this.db.query<Aluno[]>(`SELECT * FROM aluno WHERE id = '${id}'`);
            return result;
        } catch (error) {
            console.error(`Failed to fetch aluno with id ${id}:`, error);
            return {} as Aluno;
        }
    }

    create = async (aluno: Aluno) => {
        try {
            const result = await this.db.insert<Aluno>('aluno', aluno);
            return result;
        } catch (error) {
            console.error('Failed to create aluno:', error);
        }
    }

    update = async (aluno: Aluno) => {
        try {
            const result = await this.db.update<Aluno>('aluno', aluno);
            return result;
        } catch (error) {
            console.error(`Failed to update aluno with id ${aluno.id}:`, error);
        }
    }

    delete = async (id: string) => {
        try {
            const result = await this.db.delete(`aluno:'${id}'`);
            return result;
        } catch (error) {
            console.error(`Failed to delete aluno with id ${id}:`, error);
        }
    }
}

const AlunoData = new AlunosData();
export { AlunoData };

