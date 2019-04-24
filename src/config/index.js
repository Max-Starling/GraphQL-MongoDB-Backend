const port = parseInt(process.env.PORT, 10) || 4000;

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    apiUrl: `http://localhost:${port}`,
    port,
  }
};

module.exports = config[env];
