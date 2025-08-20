import { FirebaseMessaging, Sequelize } from '@/models';
const { Op } = Sequelize;

export async function sequelizeAddToken(token = { token: '', os: '' }) {
  const response = await FirebaseMessaging.findOrCreate({
    where: {
      [Op.and]: [
        { token: { [Op.eq]: token.token } },
        { os: { [Op.eq]: token.os } }
      ]
    },
    defaults: { ...token }
  });
  return response;
}

export async function sequelizeRemoveToken(token = '') {
  const response = await FirebaseMessaging.destroy({
    where: { token }
  });
  return response;
}

export async function sequelizeFindToken(token = '') {
  const response = await FirebaseMessaging.find({
    where: { token }
  });
  return response;
}

export async function sequelizeFindAllToken() {
  const response = await FirebaseMessaging.findAll();
  return response;
}
