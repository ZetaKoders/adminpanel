import { useLocation, useNavigate } from "@builder.io/qwik-city";





import { $, component$, useTask$, type QRL } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { Surreal } from 'surrealdb.js';
import { email, type Input, minLength, object, string, date, number } from 'valibot';
import type { Aluno, evento } from '~/models/types';
import { AlunoData, EventoData } from '~/services';

export const useUser = routeLoader$(({ sharedMap }) => {
  const users: Aluno[] = [];
  for (const [key, value] of sharedMap.entries()) {
    if (key.startsWith("aluno:")) {
      const aluno = value as Aluno;
      users.push(aluno);
    
  }
}
});


export const updateAlunoData = async (LoginForm: EventSchema, register: boolean ) => {


  try {
    const db = new Surreal();
    await db.connect('wss://surreal.orizuro.eu/rpc', {
      namespace: 'teste',
      database: 'testeadmin',
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });

    console.log('Connected to Surreal');
    const Aluno: Aluno = convertToAluno(LoginForm);

    console.log('Aluno converted', Aluno);
    if(register){
    
    
    const [result] = await db.query(`create aluno:${Aluno.id} set 
      email= "${Aluno.email}",
      course= "${Aluno.course}",
      role= "${Aluno.role}",
      locker= "${Aluno.locker}",
      phone= "${Aluno.phone}",
      name= "${Aluno.name}",
      firstTime= ${Aluno.firstTime},
      img= "${Aluno.img}"
    ;`);
    //.insert<Aluno>(`aluno`, Aluno);
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
const convertToAluno = (validatedData: EventSchema): evento => {
  console.log('Aluno converted', validatedData);

  return {
    description: validatedData.description,
    id: validatedData.id,
    local: validatedData.local,
    name: validatedData.name,
    category: validatedData.category,
    timeEnd: validatedData.timeEnd,
    timeStart: validatedData.timeStart,
    price: validatedData.price,
    quantity: validatedData.quantity,
  };
};

const EventSchema = object({
  description: string([
    minLength(1, 'Please enter the event description.'),
  ]),
  id: string([
  minLength(1, 'Please enter the event number'), ]),  
local: string([
  minLength(1,'Student must have a course')
]),
name: string([
  minLength(2, 'Please enter the Student name.'),
]),
category: string([]),
timeEnd: date(),
timeStart: date(),
price: number(),
quantity: number(),

});

type EventSchema = Input<typeof EventSchema>;




  export const useFormLoader = routeLoader$<InitialValues<EventSchema>>(async (requestEvent) => {
    // Await the result of useAlunos
    console.log('requestEvent:', requestEvent.params.UserId);

    const event: evento  = await EventoData.get(`event:${requestEvent.params.EventId}`) as evento;
    if(event == null){
      return {
        // Return the initial values for the form
        description: "",
        id: "",
        img: "",
        local: "",
        name: "",
        category: "",
        timeEnd: date(),
        timeStart: date(),
        price: 0,
        quantity: 0,
        isPrivate: false,

      }
    }
    return {
      // Return the initial values for the form
      description: event.description,
      id: event.id,
      local: event.local,
      name: event.name,
      img: event.img,
      category: event.category,
      timeEnd: event.timeEnd,
      timeStart: event.timeStart,
      price: event.price,
      quantity: event.quantity,
      isPrivate: event.isPrivate,
    }
  });



// Define the form action using formAction$
const EventFormAction = formAction$<EventSchema>((values) => {

  console.log('Form submitted with:', values);

}, valiForm$(EventSchema));

export default component$(() => {
    const loc = useLocation();
    const EventId: string = loc.params.EventId;
    const nav = useNavigate();
    console.log('userId:', EventId);

  const [, { Form, Field }] = useForm<EventSchema>({
    loader: useFormLoader(),
    action: EventFormAction(), // Ensure this is correctly defined elsewhere
    validate: valiForm$(EventSchema),
    
  });

  const handleSubmit: QRL<SubmitHandler<EventSchema>> = $((values) => {
    let register = false
  if(EventId === 'new'){ 
   register = true
    } 
      updateAlunoData(values, register)
      .then(result => {
        console.log('Data added successfully:', result);
        nav('/Dashboard/users')

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
    <div class='absolute bg-black bg-opacity-50 py-10 left-0 right-0 z-1000 items-center justify-center  top-4 md:inset-0 h-modal sm:h-full'>		
    <div class=" fixed inset-0 px-2 z-1000 flex items-center  justify-center">
			<div class=" w-full h-full max-w-2xl px-4 md:h-auto">
				<div class=" bg-white rounded-lg shadow dark:bg-gray-800">
          <div class="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
            {(EventId === 'new')?
            <p class="text-xl font-semibold  text-gray-800 dark:text-white">Add User</p>
            :<p class="text-xl font-semibold  text-gray-800 dark:text-white">Edit User</p>
            }
            <button
              class="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
              aria-label="Close"
              onClick$={() => nav('/Dashboard/users')
            }
              >
              <svg
                class="w-6 h-6 fill-current"
                viewBox="0 0 24 24">
                <path
                  d="M18.292 5.292L12 11.584 5.708 5.292 4.294 6.706 10.586 13l-6.292 6.292 1.414 1.414L12
                  14.414l6.292 6.292 1.414-1.414L13.414 13l6.292-6.292z"></path>
              </svg>
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

                  {field.error && <div class='text-red-500'>{field.error}</div>}
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
                      {field.error && <div class='text-red-500'>{field.error}</div>}
                    </div>
                  )}
                </Field>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <Field name="category">
                  {(field, props) => (
                    <div>
                      <input {...props} type="text" value={field.value}
                      
                      class={`shadow-sm ${field.error ? 'border-red-600' : 'border-gray-300'} bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}/>
                      {field.error && <div class='text-red-500'>{field.error}</div>}
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
                <Field name="local">
                  {(field, props) => (
                    <div>
                      <input {...props} type="text" value={field.value} 
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
                <Field name="timeStart">
        {(field, props) => (
          <div>
            <input {...props} type="datetime-local" value={field.value?.toDateString()}
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
                  <Field name="timeEnd">
        {(field, props) => (
          <div>
            <input {...props} type="datetime-local" value={field.value?.toDateString.toString()}
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
                  <Field name="isPrivate">
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
  <div class='py-2'></div>
  <div
      class="items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-700">
      <button
      class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm  w-full py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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