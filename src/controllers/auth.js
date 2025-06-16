import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../services/auth.js';

/* ───────────  REGISTER  ─────────── */
export async function registerController(req, res) {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
}

/* ───────────  LOGIN  ─────────── */
export async function loginController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  /* refresh-cookies */
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  /* access-token cookie (додано) */
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: session.accessTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: session.accessToken },
  });
}

/* ───────────  LOGOUT  ─────────── */
export async function logoutController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId, refreshToken);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  res.status(204).end();
}

/* ───────────  REFRESH  ─────────── */
export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  /* оновлюємо refresh-cookies */
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  /* оновлюємо access-token cookie (додано) */
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: session.accessTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
}
