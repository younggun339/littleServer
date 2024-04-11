const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            userid:{
                type : Sequelize.STRING(20),
                allowNull : false,
                unique: true,
            },
            username: {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            password: {
                type: Sequelize.STRING(255), // VARCHAR 타입으로 설정
                allowNull: false,
                // set(value) {
                //     // 비밀번호를 해싱하여 저장
                //     // const hashedPassword = hashFunction(value);
                //     // this.setDataValue('password', hashedPassword);
                // }},
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull : false,
                defaultValue: Sequelize.NOW,
            },
    },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName : 'User',
            tableName:'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){}
};

module.exports = User;