module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //Mysql에서 자동으로 users 테이블 생성 (소문자+s 변환 시퀄라이즈와 mysql간의 규칙)
        //id가 기본적으로 들어있다 자동으로 매겨줌
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true, //고유값
        },
        ninckname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8-general_ci', //한글저장
    });
    User.associate = (db) => {};
    return User;
};