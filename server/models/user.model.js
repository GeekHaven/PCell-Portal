import { DataTypes } from 'sequelize';

import sequelize from '../config/sql.config.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rollNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cgpa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    resumeLink: {
      type: DataTypes.STRING,
    },
    currentSem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completedCredits: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
  },
  {
    tableName: 'current_users',
  }
);

export default User;
