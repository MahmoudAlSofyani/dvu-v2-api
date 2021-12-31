//create comment and add it to post by code
//delete comment
//update comment

const { Comment } = require("../db/models");
const {
  generateResponse,
  generateCode,
  generateUrlSlug,
} = require("../helpers");
const { Op } = require("sequelize");

exports.searchComments = async (req, res, next) => {
  try {
    const { filters, limit } = req.body;
    let whereClause = [];
    let searchClause = null;

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && value.length > 0) {
          switch (key) {
            case "search":
              searchClause = {
                [Op.or]: [
                  {
                    code: { [Op.like]: `%${value}%` },
                  },
                  {
                    details: { [Op.like]: `%${value}%` },
                  },
                ],
              };
              break;
          }
        }
      }
    }

    const whereObj =
      searchClause === null
        ? Object.assign({}, whereClause)
        : { ...Object.assign({}, whereClause), ...searchClause };

    Comment.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_comments) => {
        res.status(200).send(_comments);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { post } = req.body;
    const { user } = req;

    let options = {
      user,
      post,
    };

    const _comment = await Comment.create(
      {
        code: await generateCode(req, next, "comment"),
        ...req.body,
      },
      options
    );
    res.status(200).send(_comment);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateCommentByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { user } = req;

    const [count, [_updatedComment]] = await Comment.update(
      { ...req.body },
      { individualHooks: true, where: { code, userId: user.id } }
    );

    if (_updatedComment) {
      res.status(200).send({ ..._updatedComment.toJSON() });
    } else
      generateResponse(null, req, next, 400, "validations.comment.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deleteComments = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _count = await Comment.destroy({
      where: {
        code: {
          [Op.in]: codes,
        },
      },
    });
    res.status(200).send({ count: _count });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
