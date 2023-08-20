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
    avatar: 'string|optional',
  };

  const validate = val.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      message: validate[0].message,
      status: 'error',
    });
  }

  const { id } = req.params;
  const {
    name,
    email,
    password,
    profession,
    avatar,
  } = req.body;

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found!',
    });
  }

  if (email) {
    const checkEmail = await Users.findOne({
      where: {
        email,
      },
    });

    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: 'error',
        message: 'Email already exist!',
      });
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await user.update({
    name,
    profession,
    avatar,
    email,
    password: passwordHash,
  });

  const data = {
    id: user.id,
    name,
    email,
    profession,
    avatar,
  };

  return res.json({
    status: 'success',
    data,
  });
};
