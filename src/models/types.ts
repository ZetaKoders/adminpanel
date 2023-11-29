import { object, string, boolean, email, minLength } from 'valibot';

export type Aluno = {
	course: String,
	email: String,
	firstTime: Boolean,
	id: String,
	locker: String,
	name: String,
	phone: String,
	role: String,
	img: String,
}

export type evento = {
    description: String,
    id: String,
    img: String ,
    local: String,
    name: String,
    qrData: String,
    timeEnd: String,
    timeStart: String,

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