import { RequestHandler } from "@builder.io/qwik-city";
import { AlunoData } from "~/services";




export const onRequest: RequestHandler = async ({
	sharedMap,
}) => {
	const alunos = await AlunoData.getAll();

	sharedMap.set('alunos', alunos);
};


