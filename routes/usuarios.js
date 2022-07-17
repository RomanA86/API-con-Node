const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios.js');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

router.get('/', usuariosGet);

router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({min:6}),
    check('role').custom(esRoleValido),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    validarCampos
],
 usuariosPost);

router.put('/:id', [
  check('id', 'No es un ID de Mongo válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos,
] , usuariosPut);

router.delete('/:id', [
  check('id', 'No es un ID de Mongo válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos,
] , usuariosDelete);

module.exports = router;