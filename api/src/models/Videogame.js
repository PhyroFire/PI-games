const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    img: {
      type: DataTypes.BLOB,
    },
    myGame: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{timestamps: false});
};
