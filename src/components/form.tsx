






// export const update = component$((props: { id: string; alunoData: Aluno }) => {
//     const formState = useStore({
//       aluno: props.alunoData,
//       validationErrors: null as any, // Or a more specific type for your validation errors
//     });
  
//     const handleSubmit$ = component$((event) => {
//       event.preventDefault();
  
//       // Validate the aluno data using Valibot's parse function
//       const validationResult = parse(alunoSchema, formState.aluno);
  
//       // Handle validation errors
//       if (!validationResult.success) {
//         formState.validationErrors = validationResult.error; // Store validation errors
//         return; // Stop processing if validation fails
//       }
  
//       // Proceed with updating the Aluno data after successful validation
//       // For example, making an API call to update the data in the database
//       // ...
  
//       // Optionally reset the form or redirect after successful update
//     });

//   return (
//     <div class="space-y-12 md:space-y-14 lg:space-y-16">
//       <FormHeader
//         of={loginForm}
//         form="login-form"
//         heading="Login form"
//         resetAction={resetFormAction}
//       />

//       <Form
//         id="login-form"
//         class="space-y-8 md:space-y-10 lg:space-y-12"
//         onSubmit$={(values) => {
//           // Runs on client
//           console.log(values);
//         }}
//       >
//         <Field name="email">
//           {(field, props) => (
//             <TextInput
//               {...props}
//               value={field.value}
//               error={field.error}
//               type="email"
//               label="Email"
//               placeholder="example@email.com"
//               required
//             />
//           )}
//         </Field>
//         <Field name="course">
//           {(field, props) => (
//             <TextInput
//               {...props}
//               value={field.value}
//               error={field.error}
//               type="text"
//               label="Course"
//               placeholder="example"
//               required
//             />
//           )}
//         </Field>
        
//         <Field name="name">
//           {(field, props) => (
//             <TextInput
//               {...props}
//               value={field.value}
//               error={field.error}
//               type="text"
//               label="Name"
//               placeholder="example"
//               required
//             />
//           )}
//         </Field>
//         <Field name="locker">
//             {(field, props) => (
//                 <TextInput
//                 {...props}
//                 value={field.value}
//                 error={field.error}
//                 type="text"
//                 label="Locker"
//                 placeholder="example"
//                 required
//                 />
//             )}
//         </Field>
//         <Field name="phone">
//           {(field, props) => (
//             <TextInput
//               {...props}
//               value={field.value}
//               error={field.error}
//               type="text"
//               label="phone number"
//               placeholder="example"
//               required
//             />
//           )}
//         </Field>


//         <Response class="pt-8 md:pt-10 lg:pt-12" of={loginForm} />
//       </Form>

//       <FormFooter
//         of={loginForm}
//         form="login-form"
//         resetAction={resetFormAction}
//       />
//     </div>
//   );
// });

