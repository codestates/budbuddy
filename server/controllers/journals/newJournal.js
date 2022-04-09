const { sequelize, Journals, Journal_Images, Images, Journal_Actions, Actions, Plants } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");
module.exports = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  const { images = [], actions = [], plant_id, title = "", body = "", public, plant_height } = req.body;
  let { date_pick } = req.body;

  // requirements
  if (!plant_id || public === undefined) return res.status(400).send({ message: "Bad Request" });
  // defaults
  if (!date_pick) {
    date_pick = new Date().toISOString().split("T")[0];
  }
  try {
    const plant = await Plants.findByPk(plant_id);
    if (!plant) {
      await transaction.rollback();
      return res.status(404).send({ message: `Not Found, plant id: ${plant_id} invalid` });
    }
    if (plant.user_id !== user_id) {
      await transaction.rollback();
      return res.status(403).send({ message: `Forbidden, plant id: ${plant_id} is not allowed` });
    }

    const journal = await Journals.create(
      {
        user_id,
        plant_id,
        title,
        body,
        date_pick,
        plant_height,
        public,
      },
      { transaction },
    );

    if (images.length !== 0) {
      var jrn_img = [];

      for (const imageId of images) {
        const dbImage = await Images.findByPk(imageId);
        if (!dbImage) {
          await transaction.rollback();
          return res.status(400).send({ message: `Bad Request, image id: ${imageId} invalid` });
        }
        if (dbImage.user_id !== user_id) {
          await transaction.rollback();
          return res.status(401).send({ message: `Unauthorized, image id: ${imageId} is not allowed` });
        }

        const _journal_images = await Journal_Images.create(
          {
            journal_id: journal.id,
            image_id: dbImage.id,
          },
          { transaction },
        );
        jrn_img.push(_journal_images.toJSON());
      }
    }

    if (actions.length !== 0) {
      var jrn_act = [];
      for (const action of actions) {
        const dbAction = await Actions.findOne({ where: { type: action } });
        if (!dbAction) return res.status(400).send({ message: `Bad Request, actions: ${action}`, data: action });
        const _journal_actions = await Journal_Actions.create(
          {
            journal_id: journal.id,
            action_id: dbAction.id,
          },
          { transaction },
        );
        jrn_act.push(_journal_actions.toJSON());
      }
    }

    await transaction.commit();
    return res.status(201).send({
      message: "Created",
      data: {
        journal: journal.toJSON(),
        journal_images: jrn_img,
        journal_actions: jrn_act,
      },
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Sequelize Error: ", err);
    return res.status(500).send(err);
  }
};
