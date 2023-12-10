
import { $, component$, type QRL } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { Surreal } from 'surrealdb.js';
import { email, type Input, minLength, object, string } from 'valibot';
import type { Aluno } from '~/models/types';


export const addAlunoData = async (LoginForm: LoginForm) => {

  
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

    console.log('Connected to Surreal');
    const Aluno: Aluno = convertToAluno(LoginForm);


    const result = await db.insert<Aluno>('aluno', Aluno);

    console.log('Write result: ', result);
    return result;  
  } catch (error) {
    console.error('Database operation failed:', error);
    throw new Error('Failed to save data. Please try again later.');
  }
};



const convertToAluno = (validatedData: LoginForm): Aluno => {
  console.log('Aluno converted', validatedData);

  return {
    email: validatedData.email,
    id: validatedData.id,
    course: validatedData.course,
    role: validatedData.role || '--', // Assuming role and locker can be empty
    locker: validatedData.locker || '--',
    phone: validatedData.tel,
    name: validatedData.name,
    firstTime: true,
    img: ''
  };
};




const LoginSchema = object({
  email: string([
    minLength(1, 'Please enter the student institutional email.'),
    email('The email address is badly formatted.'),
  ]),
  id: string([
  minLength(1, 'Please enter the Student Number'), ]),  
course: string([
  minLength(1,'Student must have a course')
]),
role: string([

]),
locker: string([]),
tel: string([
  minLength(9, 'Invalid phone Number!'),
]),
name: string([
  minLength(2, 'Please enter the Student name.'),
]),
});

type LoginForm = Input<typeof LoginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  id: '',
  course: '',
  role: '',
  locker: '',
  tel: '',
  name: '',
}));

export const useFormAction = formAction$<LoginForm>((values) => {
  // Runs on server
}, valiForm$(LoginSchema));

export default component$(() => {
  const [, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });
  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values, event) => {

    console.log('Form submitted:', values);
    addAlunoData(values)
      .then(result => {
        console.log('Data added successfully:', result);
        // Optionally, redirect to another page or show a success message
      })
      .catch(error => {
        console.error('Error adding data:', error);
        // Display an error message to the user
        // Update the state to trigger a UI update, if necessary
      });
  });

  return (
   
    <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
      <div
        class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold dark:text-white">Edit user</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
          data-modal-toggle="edit-user-modal"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path></svg
          >
        </button>
      </div>
      <div class="p-6 space-y-6">
        <Form onSubmit$={handleSubmit}>
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
             <Field name="name">
      {(field, props) => (
        <div>
          <input {...props} type="name" value={field.value} 
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>

          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="studentNumber"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Number</label>
              <Field name="id">
      {(field, props) => (
        <div>
          <input {...props} type="id" value={field.value}
class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <Field name="email">
      {(field, props) => (
        <div>
          <input {...props} type="email" value={field.value}
          
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="course"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Student Course</label
              >
              <Field name="course">
      {(field, props) => (
        <div>
          <input {...props} type="name" value={field.value} 
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>

          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="current-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Students Role</label
              >
              <Field name="role">
      {(field, props) => (
        <div>
          <input {...props} type="name" value={field.value}
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="new-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Students Phone Number
                </label>
                <Field name="tel">
      {(field, props) => (
        <div>
          <input {...props} type="name" value={field.value}
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>

          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="new-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Students Locker
                </label>
                <Field name="locker">
      {(field, props) => (
        <div>
          <input {...props} type="name" value={field.value}
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>

          {field.error && <div>{field.error}</div>}
        </div>
      )}
    </Field>



          </div>
        </div>

      
          <div
          class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
          <button
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
            >Submit</button>
        </div>
        </Form>

      </div>
    </div>
  </div>


  );
});