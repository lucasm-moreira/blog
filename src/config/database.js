module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  database: 'blog',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
