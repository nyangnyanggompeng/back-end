const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).send('LOGOUT_SUCCESS');
  } catch (err) {
    req.message = 'LOGOUT';
    next(err);
  }
};

export default logoutUser;
