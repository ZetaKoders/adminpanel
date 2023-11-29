import { component$, useSignal, $, useStore, event$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Surreal } from 'surrealdb.js';
import type { Aluno } from '~/models/types';
import { LoginForm } from '~/components/LoginForm';
import { integer } from 'valibot';


export const useAlunoData = routeLoader$(async () => {
  try {
    const db = new Surreal();
    await db.connect('wss://surreal.orizuro.eu/rpc', {
      namespace: 'teste',
      database: 'testedb',
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });
    
    const result = await db.query<Aluno[]>('SELECT * FROM aluno');
    console.log('result: ', result);
      return result as Aluno[];
  } catch (error) {
    console.error(error);
    return []; // Or handle the error as appropriate
  }
});





// const currentElm = useSignal<HTMLElement|null>(null);
// const targetElm = useSignal<HTMLElement|null>(null);

// return (
//   <section onClick$={(event, currentTarget) => {
// 	currentElm.value = currentTarget;
// 	targetElm.value = event.target as HTMLElement;



export default component$(() => {
  const alunosData = useAlunoData().value.flat();
  console.log('data from alunosdata', alunosData)


  const showModal = useSignal(false); // State for modal visibility

  const handleCloseModal = event$(() => {
    state.showModal = false;
  });

  
  const state = useStore({ showModal: false });

  return (
    <>

    <div
    class="p-4 bg-white block z-10 sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
	
		<div class="w-full mb-1">
			<div class="mb-4">
			
				<nav class="flex mb-5" aria-label="Breadcrumb">
					<ol
						class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2"
					>
						<li class="inline-flex items-center">
							<a
								href="#"
								class="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
							>
								<svg
									class="w-5 h-5 mr-2.5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
									></path></svg>
								Home
							</a>
						</li>
						<li>
							<div class="flex items-center">
								<svg
									class="w-6 h-6 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"></path></svg>
								<a
									href="#"
									class="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
									>Users</a>
							</div>
						</li>
						<li>
							<div class="flex items-center">
								<svg
									class="w-6 h-6 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"></path></svg>
								<span
									class="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
									aria-current="page">List</span>
							</div>
						</li>
					</ol>
				</nav>
				<h1
					class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
				>
					All users
				</h1>
			</div>
			<div class="sm:flex">
				<div
					class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700"
				>
					<form class="lg:pr-3" action="#" method="GET">
						<label for="users-search" class="sr-only">Search</label>
						<div class="relative mt-1 lg:w-64 xl:w-96">
							<input
								type="text"
								name="email"
								id="users-search"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Search for users"
							/>
						</div>
					</form>
					<div class="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
						<a
							href="#"
							class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<svg
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
									clip-rule="evenodd"></path></svg>
						</a>
						<a
							href="#"
							class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<svg
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"></path></svg>
						</a>
						<a
							href="#"
							class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<svg
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"></path></svg>
						</a>
						<a
							href="#"
							class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<svg
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
								></path></svg>
						</a>
					</div>
				</div>
				<div class="flex items-center ml-auto space-x-2 sm:space-x-3">
					

					<button
						class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						type="button"
						onClick$={() => (state.showModal = !state.showModal)}      >
						Open regular modal
					</button>
      

						<svg
							class="w-5 h-5 mr-2 -ml-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clip-rule="evenodd"></path></svg>
						Add user
					
					<a
						href="#"
						class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
					>
						<svg
							class="w-5 h-5 mr-2 -ml-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
								clip-rule="evenodd"></path></svg>
						Export
					</a>
				</div>
			</div>
		</div>
	</div>
	


	<div class="flex flex-col z-0 ">
		<div class="overflow-x-auto flex-nowrap">
			<div class="inline-block min-w-full align-middle">
				<div class="overflow-hidden shadow">
					<table
						class="min-w-full divide-y flex-nowrap divide-gray-200 table-fixed dark:divide-gray-600"
					>
						<thead class="bg-gray-100 flex-nowrap dark:bg-gray-700">
							<tr>
								<th scope="col" class="p-4 ">
									<div class="flex items-center">
										<input
											id="checkbox-all"
											aria-describedby="checkbox-1"
											type="checkbox"
											class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label for="checkbox-all" class="sr-only">checkbox</label>
									</div>
								</th>
								<th
									scope="col"
									class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
								>
									Name
								</th>
								<th
									scope="col"
									class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
								>
									Course
								</th>
								<th
									scope="col"
									class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
								>
									Role
								</th>
								<th
									scope="col"
									class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
								>
									Phone Number
								</th>
								<th
									scope="col"
									class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody
							class="bg-white flex-nowrap dark:bg-gray-800 dark:divide-gray-700"
						>
							{
								alunosData.map((aluno) => (

									//TODO: ADD KEY TO ITERATION
									<div key={aluno.id.toString()}>
										<tr class="relative z-0 flex-row flex-nowrap hover:bg-gray-100 dark:hover:bg-gray-700">
											<td class="w-4 p-4 ">
												<div class="flex items-center">
												<input
													id={`checkbox-${aluno.id}`}
													aria-describedby={`checkbox-${aluno.id}`}
													type="checkbox"
  // ... other properties
													/>
														<label for={`checkbox-${aluno.id}`} class="sr-only">
  checkbox
</label>

												</div>
											</td>
											<td class="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
												{aluno.img != ''? (
											<img class="w-10 h-10 rounded-full" src={`data:image/jpeg;base64,${aluno.img}`} alt={`${aluno.name} avatar`} width="300" height="200"/>
												) : <img class="w-10 h-10 rounded-full" src={`data:image/jpeg;base64,${aluno.img}`} alt={`${aluno.name} avatar`} width="300" height="200"/>
											}
												<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
													<div class="text-base font-semibold text-gray-900 dark:text-white">
														{aluno.name.toString()}
													</div>
													<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
														{aluno.email.toString()}
													</div>
												</div>
											</td>
											<td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
												{aluno.course.toString()}
											</td>
											<td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{aluno.role.toString()}
											</td>
											<td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{aluno.phone}
											</td>
											<td class="p-4 space-x-2 whitespace-nowrap">
												<button
													type="button"
													data-modal-target="edit-user-modal"
													data-modal-toggle="edit-user-modal"
													class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
												>
													<svg
														class="w-4 h-4 mr-2"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<>
															<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
															<path
																fill-rule="evenodd"
																d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
																clip-rule="evenodd"
															/>
														</>
													</svg>
													Edit user
												</button>
												<button
  													type="button"
 													modal-target="modal"
 													
													modal-toggle="modal"
 													class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
  onClick$={async () => {
    await update(aluno.id, aluno);
  }}
>
													<svg
														class="w-4 h-4 mr-2"
														fill="currentColor"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fill-rule="evenodd"
															d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
															clip-rule="evenodd"
														/>
													</svg>
													Delete user
												</button>
											</td>
										</tr>
									</div>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<div
  class={`modal fixed inset-0 z-50 ${state.showModal ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} // for overlay
>		<div class="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
			<div class="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 class="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
					onClick$={() => state.showModal = false
					}
					>6
                    <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div class="relative p-6 flex-auto">
                  <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
					onClick$={() => state.showModal = false}
                  >
                    Close
                  </button>
                  <button
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
					onClick$={() => state.showModal = false}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="opacity-25 fixed inset-0 z-40 bg-black" />
		</div>


</>
  );
  });
