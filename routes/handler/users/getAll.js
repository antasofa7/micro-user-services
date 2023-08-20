const { Users } = require('../../../models');

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  const sqlOptions = {
    attributes: [
      'id',
      'name',
      'email',
      'avatar',
      'profession',
    ],
  };

  if (userIds.length) {
    sqlOptions.where = {
      id: userIds,
    };
  }

  const user = await Users.findAll(sqlOptions);

  return res.json({
    status: 'success',
    data: user,
  });
};
