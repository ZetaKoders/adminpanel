import { component$, useStore } from "@builder.io/qwik";
import type { Aluno, Alunos } from "~/types/types";
import { connectToDatabase } from "~/services/dbService";

export default component$(() => {
  const state = useStore<{ alunos: Alunos }>({
    alunos: [],
  });

  // Connect to the database and set up the live query
  // const setupLiveQuery = async () => {
  //   const db = await connectToDatabase();
    
  //   // Listen for live updates on the 'aluno' table
  //   db.live('SELECT * FROM aluno;', (changes) => {
  //     if (Array.isArray(changes)) {
  //       state.alunos = changes.map((change) => ({
  //         id: change.id,
  //         name: change.name,
  //         avatar: change.avatar,
  //         email: change.email,
  //         course: change.course,
  //         phone: change.phone,
  //         firstTime: change.firstTime,
  //         locker: change.locker
  //       }));
  //     }
  //   });
  // };

  // setupLiveQuery();




  return (
  <div class="overflow-x-auto">
    <div class="inline-block min-w-full align-start">
      <div class="overflow-hidden shadow">
          <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
              <thead class="bg-gray-100 dark:bg-gray-700">
                  <tr>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">ID</th>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Name</th>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Email</th>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Course</th>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Phone</th>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">First Time</th>
                      <th class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Locker</th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {state.alunos.map((aluno) => (
                console.log(aluno),
                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" key={aluno.id}>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.id}</td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.name}</td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.email}</td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.course}</td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.phone}</td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.firstTime ? 'Yes' : 'No'}</td>
                  <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{aluno.locker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  </div>

  );
});