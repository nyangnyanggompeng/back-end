const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('accessToken', { sameSite: 'none', secure: true });
    res.clearCookie('refreshToken', { sameSite: 'none', secure: true });
    return res.status(200).send('LOGOUT_SUCCESS');
  } catch (err) {
    req.message = 'LOGOUT';
    next(err);
  }
};

export default logoutUser;
