module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
    Profile.associate = (models) => {
        Profile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };
    return Profile;
}