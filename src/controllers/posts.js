const { Post } = require("../db/models");
const {
  generateResponse,
  generateCode,
  generateUrlSlug,
} = require("../helpers");
const { Op } = require("sequelize");

exports.searchPosts = async (req, res, next) => {
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
                    title: { [Op.like]: `%${value}%` },
                  },
                  {
                    description: { [Op.like]: `%${value}%` },
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

    Post.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_posts) => {
        res.status(200).send(_posts);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { files, user } = req;
    const { title } = req.body;
    let options = {
      images: files,
      url: title ? generateUrlSlug(title) : null,
    };

    const _post = await Post.create(
      {
        code: generateCode(req, next, "post"),
        userId: user.id,
        ...req.body,
      },
      options
    );
    res.status(200).send(_post);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updatePostByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { files } = req;
    const { title, deletedImages } = req.body;

    let options = {
      images: files,
      url: title ? generateUrlSlug(title) : null,
      deletedImages,
      individualHooks: true,
    };

    const [count, [_updatedPost]] = await Post.update(
      { ...req.body },
      { ...options, where: { code } }
    );

    if (_updatedPost) {
      res.status(200).send({ ..._updatedPost.toJSON() });
    } else generateResponse(null, req, next, 400, "validations.post.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _count = await Post.destroy({
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
