module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Profile.associate = models => {
        Profile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Profile;
};