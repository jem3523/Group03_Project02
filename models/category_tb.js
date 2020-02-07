module.exports = function(sequelize, DataTypes) {
  var category_tb = sequelize.define("category_tb", {
    categoryName:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,50]},
    }
  },
  category_tb.associate = function(models) {
    //Associating categories table with links table
    //When a category is deleted, also delete any associated links
    category_tb.hasMany(models.Post, {
      onDelete: "cascade"
    });
  },
  {freezeTableName: true}
  );
  return category_tb;
};
