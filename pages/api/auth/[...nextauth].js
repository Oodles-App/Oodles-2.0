import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "oodles@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        if (
          credentials.username === "Oodles" &&
          credentials.password === "test"
        ) {
          return {
            id: 2,
            name: "Oodles",
            email: "oodles@test.com",
          };
        }
        // when login failed 
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
        // the object is available the first time jwt callback is run
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
