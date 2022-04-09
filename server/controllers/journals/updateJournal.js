const { Journals, Journal_Actions, Actions } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");
module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;
  const journal_id = req.params.id;
  const { actions, title, body, public, plant_height } = req.body;
  let { date_pick } = req.body;

  // actions가 들어왔지만 배열이 아닌경우
  if (actions !== undefined && !Array.isArray(actions)) return res.status(400).send({ message: "Bad Request, actions is array only" });

  try {
    // const plant = await Plants.findByPk(plant_id);
    // if (!plant) {
    //   await transaction.rollback();
    //   return res.status(404).send({ message: `Not Found, plant id: ${plant_id} invalid` });
    // }
    // if (plant.user_id !== user_id) {
    //   await transaction.rollback();
    //   return res.status(403).send({ message: `Forbidden, plant id: ${plant_id} is not allowed` });
    // }

    const journal = await Journals.findByPk(journal_id, { include: Journal_Actions });

    if (!journal) return res.status(404).send({ message: "Not Found" });
    if (journal.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });

    await Journals.update(
      {
        title: title || journal.title,
        body: body || journal.body,
        date_pick: date_pick || journal.date_pick,
        plant_height: plant_height || journal.plant_height,
        public: public !== undefined ? public : journal.public,
      },
      {
        where: {
          id: journal_id,
        },
      },
    );

    if (actions !== undefined) {
      await Journal_Actions.destroy({ where: { journal_id: journal_id } });
      for (const action of actions) {
        const dbAction = await Actions.findOne({ where: { type: action } });
        if (!dbAction) return res.status(400).send({ message: `Bad Request, actions: ${action}`, data: action });
        await Journal_Actions.findOrCreate({
          where: {
            journal_id: journal.id,
            action_id: dbAction.id,
          },
        });
      }
    }
    await journal.reload();
    return res.status(200).send({ message: "Updated", data: journal });
  } catch (err) {
    console.error("Sequelize Error: ", err);
    return res.status(500).send(err);
  }
};
