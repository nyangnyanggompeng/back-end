import cookieParser from 'cookie-parser';

function logout (req, res) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken")
      res.status(200).send("LOGOUT_COMPLETED");
    } catch (err) {
      res.status(400).send("LOGOUT_FAILURE");
    }
}

export default {
    logout
}