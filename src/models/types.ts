import { object, string, boolean, email, minLength } from 'valibot';

export type Aluno = {
	course: string,
	email: string,
	firstTime: boolean,
	id: string,
	locker: string,
	name: string,
	phone: string,
	role: string,
	img: string,
}

export type evento = {
    description: string,
    id: string,
    img: string ,
    local: string,
    name: string,
    category: string,
    timeEnd: Date,
    timeStart: Date,
	isPrivate: boolean,
	price: number,
	quantity: number,

}

export const alunoSchema = object({
	course: string([minLength(1, 'Please enter students course.')]),
	email: string([email('The email address is badly formatted.')]),
	firstTime: boolean(),
	id: string([minLength(1, 'Please enter students id.')]),
	locker: string(), 
	name: string([minLength(1, 'Please enter students name.')]),
	phone: string([minLength(9, 'Please enter students phone.')]),
	role: string([minLength(1, 'Please enter students role.')]),
	img: string([minLength(1, 'Please enter students img.')]),
  });