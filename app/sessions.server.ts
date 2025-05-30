import { PrismaClient } from '@prisma/client';
import { createCookie, createSessionStorage } from 'react-router';

const prisma = new PrismaClient();

type SessionData = {
  userId?: number;
  userRole?: string;
  hasSeenWelcome?: boolean;
};

type SessionFlashData = {
  error?: string;
  success?: string;
  warning?: string;
};

export const sessionCookie = createCookie('__session', {
  secrets: [
    process.env.SESSION_SECRET ||
      'a_very_insecure_fallback_secret_change_me_in_production'
  ],
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 1
});

export const { getSession, commitSession, destroySession } =
  createSessionStorage<SessionData, SessionFlashData>({
    cookie: sessionCookie,

    async createData(data, expires) {
      try {
        const session = await prisma.session.create({
          data: {
            userId: data?.userId ?? null,
            data,
            expiredAt: expires ?? new Date(Date.now())
          }
        });
        return session.id;
      } catch (error) {
        console.error('Error creating session data:', error);
        throw new Error('Failed to create session.');
      }
    },

    async readData(id) {
      try {
        const session = await prisma.session.findUnique({
          where: { id },
          select: {
            userId: true,
            data: true,
            expiredAt: true
          }
        });

        if (!session || session.expiredAt < new Date()) {
          // If session not found or has expired in the DB, return null
          return null;
        }

        // Reconstruct the SessionData from the specific columns and the JSON 'data' field
        const sessionData: SessionData = {
          ...(session.data as SessionData), // Spread the generic 'data' JSON field
          userId: session.userId || undefined
        };

        return sessionData;
      } catch (error) {
        console.error(`Error reading session data for ID ${id}:`, error);
        // Do not throw here, as returning null will correctly indicate session not found.
        return null;
      }
    },

    async updateData(id, data, expires) {
      try {
        await prisma.session.update({
          where: { id },
          data: {
            userId: data.userId ?? NaN,
            data,
            expiredAt: expires
          }
        });
      } catch (error) {
        console.error(`Error updating session data for ID ${id}:`, error);
        throw new Error('Failed to update session.');
      }
    },

    async deleteData(id) {
      try {
        await prisma.session.delete({
          where: { id }
        });
      } catch (error) {
        // If the session doesn't exist to be deleted, that's okay, but log other errors.
        console.error(`Error deleting session data for ID ${id}:`, error);
      }
    }
  });
