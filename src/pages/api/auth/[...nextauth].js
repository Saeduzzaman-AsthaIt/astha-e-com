import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const fixedUsername = 'admin';
        const fixedPassword = 'password123';
        console.log("Credentials ---");
        console.log(credentials);

        // Check if the credentials match the fixed username and password
        if (
          credentials?.username === fixedUsername &&
          credentials?.password === fixedPassword
        ) {
          // Return the user object on successful authentication
          return {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
          };
        } else {
          // Return null if the authentication fails
          return null;
        }
      },
    }),
    
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page (optional)
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add the user object to the token if it exists
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the user object to the session
      session.user = token.user;
      return session;
    },
  },
}

console.log("Rony Sarker Auth ---");
console.log(authOptions);

export default NextAuth(authOptions);