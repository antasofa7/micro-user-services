/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const { Users } = require('../../../models');

const val = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    password: 'string|min:6',
    profession: 'string|optional',
  };

  const validate = val.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      message: validate[0].message,
      status: 'error',
    });
  }

  const {
    name,
    email,
    password,
    profession,
  } = req.body;

  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(409).json({
      status: 'error',
      message: 'Email already exist',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const data = {
    name,
    email,
    password: passwordHash,
    profession,
    role: 'STUDENT',
  };

  const createdUser = await Users.create(data);

  return res.json({
    status: 'success',
    data: {
      id: createdUser.id,
    },
  });
};
