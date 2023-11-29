import { component$, useSignal } from '@builder.io/qwik';
import { routeAction$, zod$, z} from '@builder.io/qwik-city';
import { useForm, zodForm$ } from '@modular-forms/qwik'; 
export const useAddUser = routeAction$(
  async (user) => {
    // `user` is typed { name: string }
    const userID = await db.users.add(user);
    return {
      success: true,
      userID,
    };
  },
  zod$({
    name: z.string(),
  })
);



// Define the schema for the form using Zod
const formSchema = z.object({
  email: z
    .string()
    .nonempty('Please enter your email')
    .email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Your password must have 8 characters or more.'),
});

// Infer the type for the form data from the Zod schema
type LoginForm = z.infer<typeof formSchema>;

// Define the Qwik component
export default component$(() => {
  // Create a signal for the initial form values
  const initialValues = useSignal({ email: '', password: '' });

  // Initialize the form using the useForm hook
  const [, { Form, Field }] = useForm<LoginForm>({
    loader: initialValues, // Use the signal for initial values
    validate: zodForm$(formSchema), // Use Zod for validation
  });

  // Render the form
  return (
    <section class="p-4">
      <h1>Qwik Modular Forms</h1>
      <Form class="flex flex-col gap-2">
        {/* Email Field */}
        <Field name="email">
          {(field, props) => (
            <>
              <input
                class="w-96"
                placeholder="Enter email"
                {...props}
                type="email"
              />
              {field.error && <div>{field.error}</div>}
            </>
          )}
        </Field>

        {/* Password Field */}
        <Field name="password">
          {(field, props) => (
            <>
              <input
                class="w-96"
                placeholder="Enter password"
                {...props}
                type="password"
              />
              {field.error && <div>{field.error}</div>}
            </>
          )}
        </Field>

        {/* Submit Button */}
        <button class="w-max" type="submit">
          Login
        </button>
      </Form>
    </section>
  );
});