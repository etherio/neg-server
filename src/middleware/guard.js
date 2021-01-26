const { auth } = require("firebase-admin");
const X_ACCESS_TOKEN = "x-access-token";
const AUTHORIZATION = "authorization";

function getToken(headers) {
  if (X_ACCESS_TOKEN in headers) {
    return { authType: "token", token: req.headers[X_ACCESS_TOKEN] };
  }

  if (AUTHORIZATION in headers) {
    const [authType, token] = headers[AUTHORIZATION].split(" ");
    return { authType: token ? authType : undefined, token: token || authType };
  }

  return {};
}

async function asyncHandler(roles, req, res, next) {
  const { token } = getToken(req.headers);
  if (!token) {
    return res.status(401).json({
      status: 401,
      code: "auth/unauthorized",
      message: "Unauthorized",
    });
  }
  try {
    let { role, uid } = (req.auth = await auth().verifyIdToken(token));
    if (roles.length && !roles.includes(role)) {
      throw { status: 403, code: "auth/forbidden", message: "Forbidden" };
    }
    res.setHeader("X-Request-Uid", uid);
    res.setHeader("X-Request-Auth", role);
    next();
  } catch (err) {
    const code = err.code || "auth/internal";
    res.status(err.status).json({ code, error: err.message });
  }
}

function guard(roles) {
  return asyncHandler.bind(this, roles || []);
}

module.exports = {
  guard,
};
