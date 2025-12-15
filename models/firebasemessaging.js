'use strict';
import { Model } from 'sequelize';

console.log('models/firebasemessaging.js');

export function createFirebaseMessaging(sequelize, DataTypes) {
  class FirebaseMessaging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  FirebaseMessaging.init(
    {
      token: DataTypes.STRING,
      os: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'FirebaseMessaging'
    }
  );
  return FirebaseMessaging;
}

console.log('models/firebasemessaging.js end');

export default createFirebaseMessaging;
