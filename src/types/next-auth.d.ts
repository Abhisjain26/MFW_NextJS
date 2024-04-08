import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: number;
    pk: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emailAllowed: boolean;
    smsAllowed: boolean;
    dateJoined: string;
    lastLogin: string;
    dateOfBirth: string;
    token: string;
    hashedEmail: string;
    gender: string;
  }

  interface Session {
    user: User;
  }
}
