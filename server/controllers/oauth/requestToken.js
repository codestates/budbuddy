module.exports = (req, res) => {
  console.log("oauth query: ", req.query);
  res.send(req.query);
};
