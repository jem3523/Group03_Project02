module.exports = function(sequelize, DataTypes) 
{
  var link_tb = sequelize.define("link_tb", 
  {
    linkURL:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]},
    }
  },
  {freezeTableName: true}
  );

  return link_tb;
};
