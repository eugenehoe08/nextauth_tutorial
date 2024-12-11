# Learnings

testUser:
email: testingUser@example.com
password: 123456

## General Folder Structure

- actions
  - For server actions
- app
  - App Router folder
  - This is where you store your frontend stuff
  - Create api folder in this for api backend routes
- components
  - To store shadcn components and self-created common components
  - You can create nested directories here to group your common components
- lib
  - db.ts
    - Store prisma configuration file
  - utils.ts
- schemas
  - To store zod schemas for validation

## Files Structure in root of repo

- auth.ts
  - setup nextauth
- auth.config.ts
  - Edge compatability
  - This is to support prisma adapter as a database
- routes.ts
  - to put all your public, protected, private routes
  - Good to have auth api prefix to prevent checking of auth for such routes
- middleware.ts
  - setup middleware for auth
  - `const {nextUrl} = req`
  - check isLoggedIn, isApiAuthRoute, isPublicRoute
  - based on the routes, write your logic
- .env
  - environment file
- .prettierrc
  - For local development

## Essential packages to install with NextJS

### Dependencies

- react-hook-form
  - To make form validation easier
- @radix-ui/react-icons
  - Basic react icons to use
- @prisma/client
  - To use prisma (database) with the client
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
- Prisma
  - Database framework


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


## NextAuth V5

### Things to install

`npm install @prisma/client @auth/prisma-adapter`
`npm install prisma --save-dev`
`npm install next-auth@beta`

### Steps for prisma database setup
1. `npx prisma init`
2. Do your configurations for prisma, setting the database_url etc.
3. `npx prisma generate`
4. `npx prisma db push`
   1. This is to push your changes to the db 

### Steps to configure nextauth V5
You can read the docs to see what to create

**General steps:**
1. Create auth.ts in the root of repository
2. Create route.ts in api folder 

**Tips**
- If we want to add a custom field to the token for middleware auth,
- we can do this in `auth.ts`
- Add session and jwt callbacks
  - Set the field in token in token callback
  - Set the field in session from the token above in session callback
  - This is useful for role based access
- You have to declare modules to extend Session and Token interfaces
  - Check out auth.js docs, under getting-started/typescript/module augmentation
  - Useful for role based access
- We can have events in `auth.ts`, where we can update some fields when user signs up etc.
  - This is to intercept when user is registering
  - You can write the logic in frontend, and one more time in the backend
    - This is to ensure both client and server are taking care of invalid fields
    - This gives higher security

### Callbacks in auth.ts

- signIn
  - We can modify the sign in behaviour
  - Prevent sign in if email is not verified etc
- session
  - From token, we can add custom fields to session
  - Add the user id into session from `token.sub`
- jwt
  - Add custom fields into jwt token
