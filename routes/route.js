const express =  require('express');
const controller = require('../controllers/playerController')

const router = express.Router();
router.get('/api/getPlayers', controller.getPlayers);
router.get('/api/getPlayer/:id', controller.getPlayer);
router.post('/api/addPlayer', controller.addPlayer);
router.put('/api/updatePlayer/:id', controller.updatePlayer);
router.delete('/api/deletePlayer/:id' , controller.deletePlayer);

router.get('/api/getUsuarios', controller.getUsuarios);
router.get('/api/getUsuario/:id', controller.getUsuario);
router.post('/api/addUsuarios', controller.addUsuarios);
router.put('/api/updateUsuarioImg/:id', controller.updateUsuarioImg);


router.get('/api/getMedallas/:id', controller.getMedallas);
router.get('/api/getLogros/:id', controller.getLogros);

router.get('/api/getHighscore/:id', controller.getHighscore);
router.get('/api/getGame/:id', controller.getGame);
router.get('/api/getDepartment', controller.getDepartment);
router.post('/api/postDepartment', controller.postDepartment);


module.exports = router;