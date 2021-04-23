const sql = require('mssql')

const config = {
    user: 'adm_ser_bd',
    password: 'CerNova7',
    database: 'bda_usuario_web',
    server: 'ser-usuario.database.windows.net',
    options: {
    trustedConnection: true
  }
} 
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}