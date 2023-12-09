import { type RequestHandler } from "@builder.io/qwik-city";
import type { Aluno } from "~/models/types";
import { AlunoData } from "~/services";


export const onGet: RequestHandler<Aluno[]> = async ({ params }) => {
	return AlunoData.get(params.id);
  };

