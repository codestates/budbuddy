module.exports = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).end();
};
