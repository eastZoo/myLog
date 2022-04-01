module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //Mysql에서 자동으로 users 테이블 생성 (소문자+s 변환 시퀄라이즈와 mysql간의 규칙)
        //id가 기본적으로 들어있다 자동으로 매겨줌
        content: {},
    }, {
        charset: 'utf8mb4', //이모티콘 = +mb4
        collate: 'utf8mb4-general_ci', //한글저장
    });
    Post.associate = (db) => {};
    return Post;
};