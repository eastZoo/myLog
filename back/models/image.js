module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { //Mysql에서 자동으로 users 테이블 생성 (소문자+s 변환 시퀄라이즈와 mysql간의 규칙)
        //id가 기본적으로 들어있다 자동으로 매겨줌
        src: {
            type: DataTypes.STRING(200), //url이라 넉넉히
            allowNull: false,
        },
    }, {
        charset: 'utf8', //이모티콘 = +mb4
        collate: 'utf8-general_ci', //한글저장
    });
    Image.associate = (db) => {};
    return Image;
};