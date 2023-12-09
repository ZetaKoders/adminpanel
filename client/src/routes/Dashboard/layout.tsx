import { Slot, component$ } from '@builder.io/qwik';
import { Navbar } from '~/components/Dashboard/SideBar/Navbar';
import { Sidebar } from '~/components/Dashboard/SideBar/Sidebar';








export default component$(() => {





  return (
    <>


      <Navbar />
        <Sidebar />
        <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
		<div
			id="main-content"
			class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 min-h-screen"
		>
			<Slot />

´		</div>
	</div>




    </>
  );
});