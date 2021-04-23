// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getPlayers(req, res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(`SELECT [User].user_first_name, [User].user_last_name, [User].user_last_name_2, Player.player_points, Player.player_level, Player.player_credits
                  FROM Player
                  INNER JOIN [User] ON [User].[user_id] = Player.player_id `)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getPlayer(req , res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('id',sql.Int, req.params.id)
            .query(`SELECT [User].user_first_name, [User].user_last_name, [User].user_last_name_2, Player.*
                    FROM Player
                    INNER JOIN [User] ON [User].[user_id] = Player.player_id 
                    WHERE player_id = @id
                    `)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async addPlayer(req , res){
      try {
        if(req.body.id != null && req.body.namePlayer != null && req.body.avatarPlayer != null && req.body.points != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('id',sql.Int, req.body.id)
          .input('name',sql.VarChar, req.body.namePlayer)
          .input('avatar',sql.VarChar, req.body.avatarPlayer)
          .input('points',sql.Int, req.body.points)
          .query("insert into [dbo].[Players] values(@id, @name, @avatar, @points)")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updatePlayer(req, res){
      try {
        if(req.body.id != null && req.body.namePlayer != null && req.body.avatarPlayer != null && req.body.points != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('id',sql.Int , req.params.id)
          .input('newName',sql.VarChar, req.body.namePlayer)
          .input('newAvatar',sql.VarChar, req.body.avatarPlayer)
          .input('newPoints',sql.Int, req.body.points)          
          .query("update [dbo].[Players] set namePlayer = @newName, avatarPlayer = @newAvatar, points = @newPoints where id = @id")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async deletePlayer(req , res){
      try {
        if(req.params.id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('id',sql.VarChar, req.params.id)
            .query("delete from Player where player_id = @id")
            res.json(result)
          } else {
            res.send('Agrega el id del jugador!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUsuarios(req, res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(`SELECT [User].user_first_name, [User].user_last_name, [User].user_last_name_2, 
                  FORMAT([User].user_last_login,'dd-MM-yy') AS 'user_last_login', 
                  Player.player_points, Player.player_level, Player.player_credits
                  FROM Player INNER JOIN [User] ON [User].[user_id] = Player.player_id`)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUsuario(req , res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .input('id', sql.Int, req.params.id)
          .query(`SELECT [User].user_first_name, [User].user_last_name, [User].user_last_name_2, 
                  FORMAT([User].user_last_login,'dd-MM-yy') AS 'user_last_login', 
                  [User].user_image, Player.player_points, Player.player_level, Player.player_credits
                  FROM Player INNER JOIN [User] ON [User].[user_id] = Player.player_id
                  WHERE [User].user_id = @id ;`)
          res.json(result.recordset)
      } catch (error) {
          res.status(500)
          res.send(error.message)
      }
  }
    async addUsuarios(req, res){
      try {
        if(req.body.idUsuarios != null && req.body.correo != null && req.body.password != null && req.body.nombre != null && req.body.apellidoM != null
          && req.body.apellidoP != null && req.body.tipoUsuario != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('idUsuarios',sql.Int, req.body.idUsuarios)
          .input('correo',sql.VarChar, req.body.correo)
          .input('password',sql.VarChar, req.body.password)
          .input('nombre',sql.VarChar, req.body.nombre)
          .input('apellidoP',sql.VarChar, req.body.apellidoP)
          .input('apellidoM',sql.VarChar, req.body.apellidoM)
          .input('tipoUsuario',sql.Bit, req.body.tipoUsuario)
          .query(`insert into [dbo].[Usuarios] 
                  values(@idUsuarios, @correo, @password, @nombre, @apellidoP, @apellidoM, 
                    GETDATE(), @tipoUsuario, 1, GETDATE(), 0, 0, 0, 0, \'img/user3\')`)
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async updateUsuarioImg(req, res){
      try {
        if(req.body.idUsuarios != null && req.body.foto != null ) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('idUsuarios',sql.Int , req.params.id)
          .input('foto',sql.VarChar, req.body.foto)         
          .query("update [dbo].[Usuarios] set foto = @foto where idUsuarios = @idUsuarios")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getMedallas(req , res){
      try {
          const pool = await poolPromise
          console.log(req.params.id)
          const result = await pool.request()
          .input('id', sql.Int, req.params.id)
          .query(`SELECT S.medal_image_URL AS 'imagen', S.medal_name AS 'nombre' FROM Medal S 
                  INNER JOIN Player_has_Medal O ON S.medal_id = O.medal_id
                  INNER JOIN Player P ON O.player_id = P.player_id
                  WHERE P.player_id = @id`)
          res.json(result.recordset)
      } catch (error) {
          res.status(500)
          res.send(error.message)
      }
  }
  async getLogros(req , res){
    try {
        const pool = await poolPromise
        console.log(req.params.id)
        const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query(`SELECT S.achievement_image_URL AS 'imagen', S.achievement_name AS 'nombre' FROM Achievement S 
                INNER JOIN Player_has_Achievement O ON S.achievement_id = O.achievement_id
                INNER JOIN Player P ON O.player_id = P.player_id
                WHERE P.player_id = @id`)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
async getHighscore(req , res){
  try {
      const pool = await poolPromise
      console.log(req.params.id)
      const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query("SELECT D.game_id, D.level_id, D.stars, D.score  FROM Play_Highscore D WHERE D.player_id = @id")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
}

const playerController = new MainController()
module.exports = playerController;