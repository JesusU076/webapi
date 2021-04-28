// import express from 'express'

const { sql,poolPromise } = require('../database/db')

class MainController {

    async getPlayers(req, res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(`SELECT player_points, player_credits FROM Player`)
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
  async getPlayerByUser (req , res){
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('id',sql.Int, req.params.id)
        .query(`SELECT player_id FROM Player where [user_id] = @id`)
        res.json(result.recordset)
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
    async addPlayer(req , res){ //////////////////
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
    async updatePlayer(req, res){///////////////
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
          .input('id',sql.Int, req.params.id)
          .query(`SELECT [User].user_first_name, [User].user_last_name, [User].user_last_name_2, FORMAT([User].user_last_login,'dd-MM-yy') AS 'user_last_login', 
            Player.player_points, Player.player_credits FROM Player INNER JOIN [User] ON [User].[user_id] = Player.[user_id] 
            INNER join User_has_Department on [user].[user_id] = User_has_Department.[user_id] WHERE [User_has_Department].[department_id] = 
            (SELECT department_id FROM User_has_Department WHERE [user_id] = @id)`)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async getUsuariosRanking(req, res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .input('id',sql.Int, req.params.id)
          .query(`EXEC PlayerTOP @id;`)
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
                  [User].user_image, Player.player_points, Player.player_credits
                  FROM Player INNER JOIN [User] ON [User].[user_id] = Player.user_id
                  WHERE [User].user_id = @id;`)
          res.json(result.recordset)
      } catch (error) {
          res.status(500)
          res.send(error.message)
      }
  }
    async addUsuarios(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .input('correo',sql.VarChar, req.body.correo)
          .input('password',sql.VarChar, req.body.password)
          .input('nombre',sql.VarChar, req.body.nombre)
          .input('apellidoP',sql.VarChar, req.body.apellidoP)
          .input('apellidoM',sql.VarChar, req.body.apellidoM)
          .input('tipoUsuario',sql.Bit, req.body.tipoUsuario)
          .input ('image',sql.VarChar,'img/user3')
          .query(`INSERT INTO [User]
                  values(@correo, @password, @nombre, @apellidoP, @apellidoM, 
                    @tipoUsuario, 1, GETDATE(), GETDATE(), @image)`)
          res.json(result)
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
          .query("update [User] set user_image = @foto where [user_id] = @idUsuarios")
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
      const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query("SELECT D.game_id, D.level_id, D.stars, D.score  FROM Play_Highscore D WHERE D.player_id = @id")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async putNewHighscore(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('game', sql.Int, req.params.game)
      .input('level', sql.Int, req.params.level)
      .input('score', sql.Int, req.params.score)
      .input('stars', sql.Int, req.params.stars)
      .query("EXEC newPoints @id, @game, @level, @score, @stars")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async getAverageAll(req, res){
  try {
    const pool = await poolPromise
      const result = await pool.request()
      .query(`SELECT AVG(score) Promedio FROM play_highscore where score > 0 AND game_id < 5;`)
      res.json(result.recordset)
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}
async getAverageTime(req, res){
  try {
    const pool = await poolPromise
      const result = await pool.request()
      .query(`select avg(DATEDIFF(second,session_date_start,session_date_end)) as tiempo FROM Game_Session WHERE game_id < 5;`)
      res.json(result.recordset)
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}
async getGame(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query("SELECT D.game_id, D.game_question_time, D.game_reward_credits  FROM Game D WHERE D.game_id= @id")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getGames(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .query("SELECT D.game_id, D.game_question_time, D.game_reward_credits  FROM Game D")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async putGame(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('game_input',sql.Int, req.body.game_input)  
      .input('time',sql.Int, req.body.time)  
      .input('credits',sql.Int, req.body.credits)  
      .query(`UPDATE Game SET game_question_time = @time,
       game_reward_credits = @credits WHERE game_id = @game_input;`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getDepartment(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .query("SELECT D.department_name FROM Department D")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getCommunity(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .query("SELECT * FROM Community")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async postDepartment(req, res){
  try {
    if(req.body.department != null) {
    const pool = await poolPromise
      const result = await pool.request()
      .input('department',sql.VarChar, req.body.department)         
      .query("INSERT INTO Department VALUES (@department)")
      res.json(result)
    } else {
      res.send('Todos los campos obligatorios!')
    }
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}
async postCommunity(req, res){
  try {
    const pool = await poolPromise
      const result = await pool.request()
      .input('title',sql.VarChar, req.body.title) 
      .input('content',sql.VarChar, req.body.content) 
      .input('image',sql.VarChar, req.body.image)        
      .query("INSERT INTO Community VALUES (@title, @content, @image)")
      res.json(result)
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}
async getQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query("SELECT question_description, question_id FROM Question WHERE game_id = @id")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async getOneQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query("SELECT question_description, question_id FROM Question WHERE question_id = @id")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getOneAnswer(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query("SELECT answer_id, answer_description, answer_correct FROM Answer WHERE question_id = @id")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async getSingleQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('amount',sql.Int, req.params.amount)
      .input('level',sql.Int, req.params.level)
      .input('game',sql.Int, req.params.game)
      .query("EXEC singleLevelGame @amount, @level, @game")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getMultipleQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('amount',sql.Int, req.params.amount)
      .input('level',sql.Int, req.params.level)
      .input('game',sql.Int, req.params.game)
      .query("EXEC multipleLevelGame @amount, @level, @game")
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async postRegistroCorreo(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('correo',sql.VarChar, req.body.correo)
      .input('departamento',sql.VarChar, req.body.departamento)
      .input('administrador',sql.Bit, req.body.administrador)
      .query(`INSERT INTO [Registro] VALUES (@correo, @administrador,
        (SELECT department_id FROM Department WHERE department_name = @departamento))`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async postRegistroDpto(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('departamento',sql.VarChar, req.body.departamento)
      .query(`INSERT INTO Department Values(@departamento)`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async getUserByName(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('correo',sql.VarChar, req.params.id)
      .query(`SELECT * FROM [User] WHERE user_mail = @correo`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getUserByRegister(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('correo',sql.VarChar, req.params.id)
      .query(`SELECT * FROM [Registro] WHERE registro_mail = @correo`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async getUser(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query(`SELECT * FROM [User] WHERE [user_id] = @id`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async deleteQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query(`EXEC SPQuestionDelete @id`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async deleteAnswer(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query(`DELETE FROM Answer where answer_id = @id`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async putAnswer(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('respuesta',sql.VarChar, req.body.respuesta)  
      .query(`UPDATE Answer SET answer_description = @respuesta WHERE answer_id = @id;`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async putQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('respuesta',sql.VarChar, req.body.respuesta)  
      .query(`UPDATE Question SET question_description = @respuesta WHERE question_id = @id;`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async addAnswer(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('respuesta',sql.VarChar, req.body.respuesta)  
      .input('type',sql.VarChar, req.body.type)  
      .query(`INSERT INTO Answer (question_id, answer_description, answer_correct) VALUES(@id, @respuesta, @type)`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}
async addQuestion(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('respuesta',sql.VarChar, req.body.respuesta)  
      .input('nivel',sql.VarChar, req.body.nivel)  
      .query(`INSERT INTO Question VALUES(@id, 1, @nivel, @respuesta)`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async getHighscoreAll(req , res){
  try {
      const pool = await poolPromise
      const result = await pool.request()
      .query(`exec HighscoreALL`)
      res.json(result.recordset)
  } catch (error) {
      res.status(500)
      res.send(error.message)
  }
}

async postRegistroActividad(req, res){
  try {
    const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('level',sql.Int, req.params.level)  
      .input('game',sql.Int, req.params.game)  
      .input('score',sql.Int, req.params.score) 
      .input('credits',sql.Int, req.params.score)  
      .input('stars',sql.Int, req.params.stars)  
      .input('min',sql.Int, req.params.min)  
      .query(`EXEC Actualizacion @id, @game, @level, @score, @credits, @stars, @min`)
      res.json(result.recordset)
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}

async postCompra(req, res){
  try {
    const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('credits',sql.Int, req.params.credits)  
      .input('amount',sql.Int, req.params.amount)  
      .input('item',sql.Int, req.params.item)  
      .query(`INSERT INTO Purchase_Data_Log VALUES (@id, @credits, @item, @amount)`)
      res.json(result.recordset)
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}

async putCompra(req, res){
  try {
    const pool = await poolPromise
      const result = await pool.request()
      .input('id',sql.Int, req.params.id)  
      .input('item',sql.Int, req.params.item)  
      .query(`EXEC restarItem @id, @item`)
      res.json(result.recordset)
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
}

}

const playerController = new MainController()
module.exports = playerController;