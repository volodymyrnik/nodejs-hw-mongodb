import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export async function authenticate(req, res, next) {
  try {
    /* 1. ДІСТАЄМО access-token ІЗ 2 ДЖЕРЕЛ:
          ─ Header  Authorization: Bearer <token>
          ─ Cookie  accessToken=<token> (ставитимемо нижче у refresh) */
    let token = null;

    // Header
    if (typeof req.headers.authorization === 'string' &&
        req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Cookie (fallback)
    if (!token && typeof req.cookies?.accessToken === 'string') {
      token = req.cookies.accessToken;
    }

    if (!token) throw createHttpError(401, 'Please, provide access token');

    /* 2. ШУКАЄМО СЕСІЮ */
    const session = await Session.findOne({ accessToken: token });
    if (!session) throw createHttpError(401, 'Session not found');

    /* 3. ПЕРЕВІРЯЄМО ТЕРМІН ДІЇ */
    if (session.accessTokenValidUntil < new Date()) {
      throw createHttpError(401, 'Access token expired');
    }

    /* 4. ДІСТАЄМО КОРИСТУВАЧА */
    const user = await User.findById(session.userId);
    if (!user) throw createHttpError(401, 'User not found');

    /* 5. ПИШЕМО КОРИСТУВАЧА В req І ПРОПУСКАЄМО ДАЛІ */
    req.user = { id: user._id, name: user.name };
    next();
  } catch (err) {
    next(err);
  }
}
