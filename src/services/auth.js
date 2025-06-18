import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import createHttpError from 'http-errors';

const fifteen_minutes = 15 * 60 * 1000;
const one_month = 24 * 60 * 60 * 30 * 1000;

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user === null) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch !== true) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + fifteen_minutes),
    refreshTokenValidUntil: new Date(Date.now() + one_month),
  });
};

export const logoutUser = async (sessionId, refreshToken) => {
  await Session.deleteOne({ _id: sessionId, refreshToken });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId });

  if (session === null) throw createHttpError(401, 'Session not found');
  if (session.refreshToken !== refreshToken)
    throw createHttpError(401, 'Refresh token is invalid');
  if (session.refreshTokenValidUntil < new Date())
    throw createHttpError(401, 'Refresh token is expired');

  // 1️⃣ Створюємо нові токени
  const newAccessToken  = crypto.randomBytes(30).toString('base64');
  const newRefreshToken = crypto.randomBytes(30).toString('base64');

  // 2️⃣ Видаляємо стару сесію
  await Session.deleteOne({ _id: session._id });

  // 3️⃣ Створюємо нову з тим самим userId
  return Session.create({
    userId: session.userId,                     // ✅ правильний id користувача
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + fifteen_minutes),
    refreshTokenValidUntil: new Date(Date.now() + one_month),
  });
};
