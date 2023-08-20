/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');

const val = new Validator();

const { Users } = require('../../../models');

module.exports = async (req, res) => {
  const schema = {
    email: 'email|empty:false',
    password: 'string|min:6',
  };

  const validate = val.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate[0].message,
    });
  }

  const {
    email,
    password,
  } = req.body;

  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User or password invalid!',
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(404).json({
      status: 'error',
      message: 'User or password invalid!',
    });
  }

  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    profession: user.profession,
    role: user.role,
    avatar: user.avatar,
  };

  res.json({
    status: 'success',
    data,
  });
};
