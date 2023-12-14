import { useLocation, useNavigate } from "@builder.io/qwik-city";





import { $, component$, type QRL } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { Surreal } from 'surrealdb.js';
import { email, type Input, minLength, object, string } from 'valibot';
import type { Aluno } from '~/models/types';
import { AlunoData } from '~/services';




export const updateAlunoData = async (LoginForm: AddUserSchema, register: boolean ) => {

  
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

    console.log('Aluno converted', Aluno);

    if(register){
    
    const aluno2: Aluno = {
      email: Aluno.email,
      id:  '123456',
      course: Aluno.course,
      role: Aluno.role || '--', // Assuming role and locker can be empty
      locker: Aluno.locker || '--',
      phone: Aluno.phone,
      name: Aluno.name,
      firstTime: true,
      img: ''
    }
    const result = await db.insert<Aluno>('aluno', aluno2);
    console.log('Write result: ', result);
    return result; 
    } else{
    console.log('Aluno.id:', Aluno.id);
    const result = await db.update<Aluno>(`${Aluno.id}`, Aluno);
    console.log('Write result: ', result);
    return result; 
  }
    
  } catch (error) {
    console.error('Database operation failed:', error);
    throw new Error('Failed to save data. Please try again later.');
  }
};

//TODO: make a conditional on firstTime
const convertToAluno = (validatedData: AddUserSchema): Aluno => {
  console.log('Aluno converted', validatedData);

  return {
    email: validatedData.email,
    id: validatedData.id,
    course: validatedData.course,
    role: validatedData.role || '--', // Assuming role and locker can be empty
    locker: validatedData.locker || '--',
    phone: validatedData.phone,
    name: validatedData.name,
    firstTime: true,
    img: ''
  };
};

const AddUserSchema = object({
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
phone: string([
  minLength(9, 'Invalid phone Number!'),
]),
name: string([
  minLength(2, 'Please enter the Student name.'),
]),
});

type AddUserSchema = Input<typeof AddUserSchema>;

  // export const useFormLoader = routeLoader$<InitialValues<AddUserSchema>>(() => ({
  //   // Return the initial values for the form
  //   email: "",
  //   id: "",
  //   course: "",
  //   role: "",
  //   locker: "",
  //   tel: "",
  //   name: "",
  
 
  // }));


  export const useFormLoader = routeLoader$<InitialValues<AddUserSchema>>(async (requestEvent) => {
    // Await the result of useAlunos
    console.log('requestEvent:', requestEvent.params.UserId);
    const aluno: Aluno = await AlunoData.get(`aluno:${requestEvent.params.UserId}`) as Aluno;
    if(aluno == null){
      return {
        // Return the initial values for the form
        email: "",
        id: "",
        course: "",
        role: "",
        locker: "",
        phone: "",
        name: "",
      }
    }
    return {
      // Return the initial values for the form
      email: aluno.email,
      id: aluno.id,
      course: aluno.course,
      role: aluno.role,
      locker: aluno.locker,
      phone: aluno.phone,
      name: aluno.name,
    }
  });



// Define the form action using formAction$
const addUserFormAction = formAction$<AddUserSchema>((values) => {

  console.log('Form submitted with:', values);

}, valiForm$(AddUserSchema));

export default component$(() => {
    const loc = useLocation();
    const userId: string = loc.params.UserId;
    const nav = useNavigate();
    console.log('userId:', userId);


    

  // const initialValues = aluno != null ? {
  //   email: aluno.email,
  //   id: aluno.id,
  //   course: aluno.course,
  //   role: aluno.role,
  //   locker: aluno.locker,
  //   tel: aluno.tel,
  //   name: aluno.name
  // } || {
  //   email: "",
  //   id: "",
  //   course: "",
  //   role: "",
  //   locker: "",
  //   tel: "",
  //   name: "",
  // });

  const [AddUserForm, { Form, Field }] = useForm<AddUserSchema>({
    loader: useFormLoader(),
    action: addUserFormAction(), // Ensure this is correctly defined elsewhere
    validate: valiForm$(AddUserSchema),
    
  });

  const handleSubmit: QRL<SubmitHandler<AddUserSchema>> = $((values) => {
    let register = false
  if(userId === 'new'){ 
   register = true
    } 
      updateAlunoData(values, register)
      .then(result => {
        console.log('Data added successfully:', result);
        // Optionally, redirect to another page or show a success message
      })
      .catch(error => {
        console.error('Error adding data:', error);
        // Display an error message to the user
        // 
    });
  
      nav('/Dashboard/users');
      
  });

  return (
    <>
    <div
id='modal'
class='fixed left-0 right-0 z-50 items-center justify-center  overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full'>		
    <div class="absolute inset-0 px-2 z-90 flex items-center  justify-center">
			<div class=" w-full h-full max-w-2xl px-4 md:h-auto">
				<div class=" bg-white rounded-lg shadow dark:bg-gray-800">
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
                  >Student Role</label
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
                    Student Phone Number
                  </label>
                  <Field name="phone">
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
</div>
</div>
</>

)});
