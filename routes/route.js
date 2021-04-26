const express =  require('express');
const controller = require('../controllers/playerController')

const router = express.Router();
router.get('/api/getPlayers', controller.getPlayers);
router.get('/api/getPlayer/:id', controller.getPlayer);
router.post('/api/addPlayer', controller.addPlayer);
router.put('/api/updatePlayer/:id', controller.updatePlayer);
router.delete('/api/deletePlayer/:id' , controller.deletePlayer);

router.get('/api/getUserByName/:id', controller.getUserByName);
router.get('/api/getUserByRegister/:id', controller.getUserByRegister);
router.get('/api/getUser/:id', controller.getUser);
router.get('/api/getUsuarios/:id', controller.getUsuarios);
router.get('/api/getUsuario/:id', controller.getUsuario);
router.post('/api/addUsuarios', controller.addUsuarios);
router.put('/api/updateUsuarioImg/:id', controller.updateUsuarioImg);


router.get('/api/getMedallas/:id', controller.getMedallas);
router.get('/api/getLogros/:id', controller.getLogros);

router.get('/api/getHighscore/:id', controller.getHighscore);
router.get('/api/getGames', controller.getGames);
router.get('/api/getGame/:id', controller.getGame);
router.put('/api/putGame', controller.putGame);
router.get('/api/getDepartment', controller.getDepartment);
router.post('/api/postDepartment', controller.postDepartment);
router.post('/api/postRegistro', controller.postRegistro);

router.get('/api/getQuestion/:id', controller.getQuestion);
router.get('/api/getOneQuestion/:id', controller.getOneQuestion);
router.get('/api/getOneAnswer/:id', controller.getOneAnswer);
router.delete('/api/deleteQuestion/:id', controller.deleteQuestion);
router.delete('/api/deleteAnswer/:id', controller.deleteAnswer);
router.get('/api/getMultipleQuestion/:amount/:level/:game', controller.getMultipleQuestion);
router.get('/api/getSingleQuestion/:amount/:level/:game', controller.getSingleQuestion);
router.put('/api/putAnswer/:id', controller.putAnswer);
router.put('/api/putQuestion/:id', controller.putQuestion);
router.post('/api/addAnswer/:id', controller.addAnswer);




module.exports = router;