const { Journals, Journal_Images, Images, Journal_Actions, Actions, Plants, Users } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = {
  my: async (req, res) => {
    try {
      var verify = await checkAuth(req, res);
    } catch (err) {
      return err; // break
    }
    const user_id = verify.idx;
    const plant_id = req.query.plant;
    try {
      let journalList;
      if (!plant_id) {
        journalList = await Journals.findAll({
          where: {
            user_id,
          },
          include: [
            {
              model: Journal_Images,
              include: Images,
            },
            {
              model: Plants,
            },
            {
              model: Journal_Actions,
              include: Actions,
            },
            {
              model: Users,
              attributes: {
                exclude: ["password", "salt"],
              },
              include: {
                model: Images,
                as: "profile_image",
              },
            },
          ],
        });
      } else {
        journalList = await Journals.findAll({
          where: {
            user_id,
            plant_id,
          },
          include: [
            {
              model: Journal_Images,
              include: Images,
            },
            {
              model: Plants,
            },
            {
              model: Journal_Actions,
              include: Actions,
            },
            {
              model: Users,
              attributes: {
                exclude: ["password", "salt"],
              },
              include: {
                model: Images,
                as: "profile_image",
              },
            },
          ],
        });
      }
      if (journalList.length === 0) return res.status(404).send({ message: "Not Found" });
      return res.status(200).send({ message: "ok", data: journalList });
    } catch (err) {
      console.error("Sequelize Error: ", err);
      res.status(500).send(err);
    }
  },
  all: async (req, res) => {
    try {
      const journalList = await Journals.findAll({
        where: {
          public: true,
        },
        include: [
          {
            model: Journal_Images,
            include: Images,
          },
          {
            model: Plants,
          },
          {
            model: Journal_Actions,
            include: Actions,
          },
          {
            model: Users,
            attributes: {
              exclude: ["password", "salt"],
            },
            include: {
              model: Images,
              as: "profile_image",
            },
          },
        ],
      });
      if (journalList.length === 0) return res.status(404).send({ message: "Not Found" });
      return res.status(200).send({ message: "ok", data: journalList });
    } catch (err) {
      console.error("Sequelize Error: ", err);
      res.status(500).send(err);
    }
  },
  id: async (req, res) => {
    const journal_id = req.params.id;
    try {
      const journal = await Journals.findOne({
        where: {
          id: journal_id,
        },
        include: [
          {
            model: Journal_Images,
            include: Images,
          },
          {
            model: Plants,
          },
          {
            model: Journal_Actions,
            include: Actions,
          },
          {
            model: Users,
            attributes: {
              exclude: ["password", "salt"],
            },
            include: {
              model: Images,
              as: "profile_image",
            },
          },
        ],
      });

      if (!journal) return res.status(404).send({ message: "Not Found" });

      if (!journal.public) {
        try {
          var verify = await checkAuth(req, res);
        } catch (err) {
          return err; // break
        }
        const user_id = verify.idx;
        if (journal.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });
      }

      return res.status(200).send({ message: "ok", data: journal });
    } catch (err) {
      console.error("Sequelize Error: ", err);
      res.status(500).send(err);
    }
  },
};
