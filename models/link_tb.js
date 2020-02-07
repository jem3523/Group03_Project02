module.exports = function(sequelize, DataTypes) {
  var link_tb = sequelize.define("link_tb", {
    linkURL:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]},
    },
    label:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]}
    }
  },
  
  link_tb.associate = function(models) {
    //Associating links with a category
    //A link can not be created without a category due to the foreign key
    link_tb.belongsTo(models.link_tb, {
      foreignKey: {
        allowNull: false
      }
    });
  },
  {freezeTableName: true}
  );
  return link_tb;
};
