import 'dotenv/config';

export const verifyApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    if (process.env.X_API_KEY !== apiKey) {
      return res.status(403).json({ success: false, message: "Forbiddenn" });
    }
    next();
  } catch (error) {
    console.error("Error in verifyApiKey middleware:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
