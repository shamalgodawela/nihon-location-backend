const express= require('express')
const router= express.Router();
const auth= require('../middleware/auth')

const { registerAdmin, loginAdmin}=require('../Controller/adminController')

router.post('/admin-register',registerAdmin)
router.post('/login', loginAdmin);

router.get('/protected', auth, (req, res) => {
    res.json({ message: 'Protected route', admin: req.admin });
});

module.exports = router;