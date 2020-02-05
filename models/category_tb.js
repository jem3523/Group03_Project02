module.exports = function(sequelize, DataTypes) 
{
  var category_tb = sequelize.define("category_tb", 
  {
    categoryName:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,50]},
    }
  },
  {freezeTableName: true}
  );

  return category_tb;
};
