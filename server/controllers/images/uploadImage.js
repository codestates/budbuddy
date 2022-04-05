const { Images } = require("../../models");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  console.log(req.file);
  if (!req.file) return res.status(400).send({ message: "Bad Request" });
  const { originalname, mimetype, key, location } = req.file;
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;

  try {
    const image = await Images.create({
      user_id,
      ext: mimetype,
      filename: originalname,
      store_filename: key,
      store_path: location,
    });
    res.status(201).send({ message: "Created", data: image.toJSON() });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
