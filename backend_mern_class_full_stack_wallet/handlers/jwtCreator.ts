import jwt from "jsonwebtoken";

const JwtCreator = (id: string) => {
  const jwtPayload = {
    user_id: id,
    _id: id,
    id: id,
  };

  const accessToken = jwt.sign(jwtPayload, process.env!.jwt_secret!, {
    expiresIn: "90days",
  });

  return accessToken;
};

export default JwtCreator;
