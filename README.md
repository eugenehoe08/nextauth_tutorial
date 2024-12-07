# Learnings

## General Folder Structure

- actions
  - For server actions
- app
  - App Router folder
  - This is where you store your frontend stuff
- api
  - Backend api routes
- components
  - To store shadcn components and self-created common components
  - You can create nested directories here to group your common components
- lib
  - utils.tsx
- schemas
  - To store zod schemas for validation

## Essential packages to install with NextJS

### Dependencies

- react-hook-form
  - To make form validation easier
- @radix-ui/react-icons
  - Basic react icons to use
- Shadcn
  - Component library that allows you to edit in code
  - Gives you many basic components to use
- Zod
  - Basic package to validate schemas
  - Best to use with typescript

### Dev Dependencies

- ESlint
  - Basic rules to follow to ensure clean code
- Prettier
  - Basic formatter to ensure code consistency
- TailwindCSS


## General knowledge when creating a new project

- Use app router instead of pages
- Create your reusable components in the components folder 
- Create an interface/type to pass to your props in react components
  - Convention is to use variable name with Props at the end

## When using app router, all files to be displayed goes into the app folder

### Folder name will determine the path of the url, and it follows nesting too.

folder - Route segment
folder/folder - Nested route segment

### Dynamic Routes

- [folder] 
  - Dynamic route segment
- [...folder]
  - Catch-all route segment
  - Catches all parent routes, and stores in ...folder
  - Example
    - { folder: ['a'] }
    - { folder: ['a', 'b'] }

### Private Routes

- (folder)
  - Group routes without affecting routing
  - Good to structure common stuff together
  - For example, auth can contain login and register, but without /auth
- _folder
  - Opt folder and all child segments out of routing

### Reserved keywords for file name
- layout.tsx 
  - to have a common component/div in all subfolders/children
- page.tsx
  - Stuff to display in the frontend


## Zod validation stuff with react hook form
Can refer to the docs.
For the form, you can use this to ensure validation and set messages.

You can either use the default form stuff fromn react-hook-form, or use the form from shadcn.

Typical Example:
```typescript jsx
    const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: '',
        password: '',
    },
})
```

Schema Example:
```typescript
export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1, { message: 'Password is required' }),
})

```

### Backend with zod validation

We can use `loginSchema.safeParse(values)` to validate our input when sending it to the server.