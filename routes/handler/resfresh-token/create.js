/* eslint-disable import/no-extraneous-dependencies */
const Validator = require('fastest-validator');
const { Users, RefreshToken } = require('../../../models');

const val = new Validator();

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  const schema = {
    refresh_token: 'string',
    user_id: 'number',
  };

  const validate = val.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate[0].message,
    });
  }

  const user = await Users.findByPk(userId);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found!',
    });
  }

  const createdRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userId,
  });

  return res.json({
    status: 'succcess',
    data: createdRefreshToken.id,
  });
};
