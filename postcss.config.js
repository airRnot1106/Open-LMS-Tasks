module.exports = (ctx) => {
  return {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: ctx.env === 'production' ? {} : false,
    },
  };
};
