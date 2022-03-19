module.exports = {
    development: {
      client: 'mssql',
      // connection: {
      //   host : '127.0.0.1',
      //   user : 'DATABASE_USERNAME',
      //   password : 'DATABASE_PASSWORD',
      //   database : 'DATABASE_NAME'
      // }
      // connection: 'postgres://localhost/dbname-dev'
    },
    // test: {
    //   client: 'mssql',
    //   connection: {
    //     host : '64.239.133.27',
    //     user : 'ramp',
    //     password : 'rampsys',
    //     database : '3lj0382'
    //   }
    // },
    production: {
      client: 'mssql',
      connection: process.env.DATABASE_URL
    }
  }