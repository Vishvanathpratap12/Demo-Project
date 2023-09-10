const express = require('express')
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');
const authMiddleware = require('../middleware/auth')
const router = express.Router()
const mediaFilesController = require('../controllers/mediaFiles');
const commonMiddleware = require('../middleware/common')

// Home page
router.get('/', (req, res) => {
    res.render('content/index',{})
});

//LOGIN  
router.all('/login', authMiddleware.isNotLogIn, async (req, res) => {

    if (req.method === 'GET' || req.method === 'POST') {
        let data
        if (req.method === 'POST' && req.body.emailAddress && req.body.userPwd) {
            const apiResult = await authController.login(req, res)
            if(apiResult.status==1) {
                res.redirect('dashboard');
                return;
            }
            else
                data = apiResult
        }
        res.render('login', data);
    }
    else {
        res.status(405).send('Method Not Allowed');
    }
});


//Forgot-password  
router.all('/forgot-password', authMiddleware.isNotLogIn, async (req, res) => {

    if (req.method === 'GET' || req.method === 'POST') {
        let data = { msgType: '', message: ''}
        if (req.method === 'POST' && req.body.emailAddress ) {
            const apiResult = await authController.forgotPassword(req, res)
            if(apiResult.status==1) {
                data.msgType = 'Success'
                data.message = apiResult.successMessage
            } else {
                data.msgType = 'Error'
                data.message = apiResult.errorMessage
            }
                
        }
        res.render('forgot-password', data);
    }
    else {
        res.status(405).send('Method Not Allowed');
    }
});

// Dashboard 
router.get('/dashboard', authMiddleware.isLoggedIn, async (req, res) => {
    let logggedInUser = {
        profilePic: 'images/2.jpg',
        name: req.session.data.first_name+' '+req.session.data.last_name,
        userId: req.session.data.id
    }

    res.render('dashboard', {logggedInUser});    
});

// Logout 
router.get('/logout', async (req, res) => {
    
    const apiResult = await authController.logout(req, res)
    if(apiResult.status==1) {
        res.redirect('login');
        return;
    }
    else
        res.redirect('dashboard');
});


// Change Password 
router.all('/change-password', authMiddleware.isLoggedIn, async (req, res) => {
    if (req.method === 'GET' || req.method === 'POST') {
        let logggedInUser = {
            profilePic: 'images/2.jpg',
            name: req.session.data.first_name+' '+req.session.data.last_name,
            userId: req.session.data.id
        }
        let data = { logggedInUser, msgType: '', message: ''}
        if (req.method === 'POST'  && req.body.oldPassword && req.body.newPassword && req.body.confirmNewPassword ) {
            const apiResult = await authController.changePassword(req, res)
            if(apiResult.status==1) {
                data.msgType = 'Success'
                data.message = apiResult.successMessage
            } else {
                data.msgType = 'Error'
                data.message = apiResult.errorMessage
            }
                
        }
        res.render('change-password', data);
    }
    else {
        res.status(405).send('Method Not Allowed');
    } 
});

// Login User Profile
router.all('/userProfile', authMiddleware.isLoggedIn, async (req, res) => {
    if (req.method === 'GET' || req.method === 'POST') {
        
        let data = { msgType: '', message: ''}
        if (req.method === 'POST') {
            const apiResult = await authController.updateProfile(req, res)
            if(apiResult.status==1) {
                data.msgType = 'Success'
                data.message = apiResult.successMessage
            } else {
                data.msgType = 'Error'
                data.message = apiResult.errorMessage
            }
                
        }

        let logggedInUser = {
            profilePic: 'images/2.jpg',
            name: req.session.data.first_name+' '+req.session.data.last_name,
            userId: req.session.data.id,
            first_name: req.session.data.first_name,
            last_name: req.session.data.last_name,
            email_address: req.session.data.email_address,
            contact: req.session.data.contact,
            address: req.session.data.address,
        }

        data.logggedInUser = logggedInUser

        res.render('userProfile', data);
    }
    else {
        res.status(405).send('Method Not Allowed');
    } 
});

// Media Files 
router.get('/media-files', authMiddleware.isLoggedIn, async (req, res) => {
    let logggedInUser = {
        profilePic: 'images/2.jpg',
        name: req.session.data.first_name+' '+req.session.data.last_name,
        userId: req.session.data.id
    }

    res.render('dashboard', {logggedInUser});    
});

// Add Media File
router.get('/media-files-add', authMiddleware.isLoggedIn, async (req, res) => {
    
    if (req.method === 'GET' || req.method === 'POST') {
        let logggedInUser = {
            profilePic: 'images/2.jpg',
            name: req.session.data.first_name+' '+req.session.data.last_name,
            userId: req.session.data.id
        }
        let data = { logggedInUser, msgType: '', message: ''}

        console.log('req.body.fileType, => ',req.body.fileType)
        console.log('req.files => ',req.files)

        if (req.method === 'POST'  && req.body.mediaFile && req.body.fileType) {
            const apiResult = await mediaFilesController.add(req, res)
            if(apiResult.status==1) {
                data.msgType = 'Success'
                data.message = apiResult.successMessage
            } else {
                data.msgType = 'Error'
                data.message = apiResult.errorMessage
            }
                
        }
        res.render('mediaFiles/add', data);
    }
    else {
        res.status(405).send('Method Not Allowed');
    } 
});

// Add Media File
router.post('/media-files-add', authMiddleware.isLoggedIn, commonMiddleware.singleFileUpload, async (req, res) => {
    console.log('req method => ',req.method)
    let logggedInUser = {
        profilePic: 'images/2.jpg',
        name: req.session.data.first_name+' '+req.session.data.last_name,
        userId: req.session.data.id
    }
    let data = { logggedInUser, msgType: '', message: ''}
    res.render('mediaFiles/add', data);
});

router.post('/test', authController.test)
module.exports = router
