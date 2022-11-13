import { verify } from "jsonwebtoken";

export default function ProfileData(req, res) {
  const { LoginToken } = req.cookies;
  try {
    const data = verify(LoginToken, "sapoperrox");
    if (data) {
      return res
        .status(200)
        .json({ user: data.user, id: data.id, role: data.role });
    }
  } catch (error) {
    return res.status(401).json("InvalidToken");
  }
}
