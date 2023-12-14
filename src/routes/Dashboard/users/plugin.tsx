import { type RequestHandler } from "@builder.io/qwik-city";
import type { Aluno } from "~/models/types";
import { AlunoData } from "~/services";


export const onRequest: RequestHandler = async ({
	sharedMap,
}) => {
	const alunos: Aluno[] = await AlunoData.getAll();
  if(alunos.length != 0) {
	alunos.forEach((aluno) => {
		sharedMap.set(`aluno:${aluno.id}`, aluno);
	});
  } else {
    console.log("Failed to load alunos");
  }
};