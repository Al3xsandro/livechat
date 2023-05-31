export default {
  secret_token: process.env.JWT_SECRET_KEY || "",
  expires_in: "1d",
};
