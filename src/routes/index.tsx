
import { $, component$, type QRL } from '@builder.io/qwik';
import { routeLoader$, useNavigate } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { Surreal } from 'surrealdb.js';
import { email, type Input, minLength, object, string } from 'valibot';
import type { Aluno } from '~/models/types';







export default component$(() => {
  const nav = useNavigate();

  return (
    <div class="overflow-x-auto">
      <h1 class="text-3xl text-black pb-6">this is dashboard</h1>
      <button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						type="button"
						onClick$={async () => {
							await nav(`/Dashboard/users/`);
						}}
					>
						<svg
							class="w-5 h-5 mr-2 -ml-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clip-rule="evenodd"></path></svg>
                go to user table
						</button>
            <button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						type="button"
						onClick$={async () => {
							await nav(`/Dashboard/EventTable/`);
						}}
					>
						<svg
							class="w-5 h-5 mr-2 -ml-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clip-rule="evenodd"></path></svg>
                go to event table
						</button>

    </div>
  );
});