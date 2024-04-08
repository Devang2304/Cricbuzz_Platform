const express=require('express');
const router = express.Router();
const {register,login,check}=require('../controllers/authController');
const protect =require('../middleware/middleware');

router.post('/admin/signup',register);
router.post('/admin/login',login);
router.post('/admin/checking',protect,check);
// router.post('/matches',)

module.exports=router;