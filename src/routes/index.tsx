
import { component$} from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';








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
                go to user table
						</button>
            <button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						type="button"
						onClick$={async () => {
							await nav(`/Dashboard/EventTable/`);
						}}
					>
						
                go to event table
						</button>

    </div>
  );
});