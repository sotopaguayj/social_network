import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { LoginToken } = req.cookies;
  if (!LoginToken) {
    return res.status(401).json("NoToken");
  }
  try {
    verify(LoginToken, "sapoperrox");
    const serialized = serialize("LoginToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("LogoutComplete");
  } catch (error) {
    return res.status(401).json("InvalidToken");
  }
}
