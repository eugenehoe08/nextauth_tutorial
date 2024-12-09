import NextAuth, { DefaultSession } from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt'

import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'

declare module 'next-auth' {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            role: string
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession['user']
    }
    interface User {
        role: string
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        role?: string
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        // async signIn({ user }) {
        //     const existingUser = await getUserById(user.id)
        //
        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false
        //     }
        //
        //     return true
        // },
        async session({ token, session }) {
            console.log({ sessionToken: token })
            console.log('Session:', session)
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }

            return session
        },
        async jwt({ token }) {
            // This means that i am logged out
            if (!token.sub) {
                return token
            }

            const existingUser = await getUserById(token.sub)

            // User does not exist
            if (!existingUser) {
                return token
            }

            token.role = existingUser.role

            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})
