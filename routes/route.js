const express =  require('express');
const controller = require('../controllers/playerController')

const router = express.Router();
router.get('/api/getPlayers', controller.getPlayers);
router.get('/api/getPlayer/:id', controller.getPlayer);
router.get('/api/getPlayerByUser/:id', controller.getPlayerByUser);
router.post('/api/addPlayer', controller.addPlayer);
router.put('/api/updatePlayer/:id', controller.updatePlayer);
router.delete('/api/deletePlayer/:id' , controller.deletePlayer);

router.get('/api/getUserByName/:id', controller.getUserByName);
router.get('/api/getUserByRegister/:id', controller.getUserByRegister);
router.get('/api/getUser/:id', controller.getUser);
router.get('/api/getUsuariosRanking/:id', controller.getUsuariosRanking);
router.get('/api/getUsuarios/:id', controller.getUsuarios);
router.get('/api/getUsuario/:id', controller.getUsuario);
router.post('/api/addUsuarios', controller.addUsuarios);
router.put('/api/updateUsuarioImg/:id', controller.updateUsuarioImg);


router.get('/api/getMedallas/:id', controller.getMedallas);
router.get('/api/getLogros/:id', controller.getLogros);

router.get('/api/getHighscore/:id', controller.getHighscore);
router.get('/api/getHighscoreall', controller.getHighscoreAll);
router.put('/api/putNewHighscore/:id/:game/:level/:score/:stars', controller.putNewHighscore);
router.get('/api/getAverageAll', controller.getAverageAll);
router.get('/api/getAverageTime', controller.getAverageTime);
router.get('/api/getGames', controller.getGames);
router.get('/api/getGame/:id', controller.getGame);
router.put('/api/putGame', controller.putGame);
router.get('/api/getDepartment', controller.getDepartment);
router.post('/api/postDepartment', controller.postDepartment);
router.post('/api/postRegistroCorreo', controller.postRegistroCorreo);
router.post('/api/postRegistroDpto', controller.postRegistroDpto);

router.get('/api/getQuestion/:id', controller.getQuestion);
router.get('/api/getOneAnswer/:id', controller.getOneAnswer);
router.get('/api/getOneQuestion/:id', controller.getOneQuestion);
router.delete('/api/deleteAnswer/:id', controller.deleteAnswer);
router.delete('/api/deleteQuestion/:id', controller.deleteQuestion);
router.put('/api/putAnswer/:id', controller.putAnswer);
router.put('/api/putQuestion/:id', controller.putQuestion);
router.post('/api/addAnswer/:id', controller.addAnswer);
router.post('/api/addQuestion/:id', controller.addQuestion);

router.get('/api/getMultipleQuestion/:amount/:level/:game', controller.getMultipleQuestion);
router.get('/api/getSingleQuestion/:amount/:level/:game', controller.getSingleQuestion);

router.post('/api/postRegistroActividad/:id/:level/:game/:score/:credits/:stars/:min', controller.postRegistroActividad)






module.exports = router;