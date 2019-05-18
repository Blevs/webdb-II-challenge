module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3', // update this with the location of your database file
    },
    useNullAsDefault: true,
  },
};
