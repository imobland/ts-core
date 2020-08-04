module.exports = {
  dialect: "mysql",

  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  storage: process.env.DB_STORAGE,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};
