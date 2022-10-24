import { verify } from "jsonwebtoken";

export default function handleProfile(req, res) {
  const { LoginToken } = req.cookies;
  if (!LoginToken) {
    return res.status(401).json("NoToken");
  }
  try {
    const user = verify(LoginToken, "sapoperrox");
    return res.status(200).json({ user: user.user });
  } catch (error) {
    return res.status(401).json("InvalidToken");
  }
}
