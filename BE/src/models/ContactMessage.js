'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const ContactMessage = sequelize.define('ContactMessage', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true  // Kiểm tra định dạng email hợp lệ
            }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return ContactMessage;
};
