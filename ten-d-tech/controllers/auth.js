const authModel = require('../models/authModel');
const md5 = require('md5');
const generator = require('generate-password');
const emailService = require('../services/email')


const login = async (request, response) => {
    
    const email = request.body.emailAddress
    const password = md5(request.body.userPwd)
    const result = await authModel.getUserUsingEmailPassword(email, password);

    if (result) {
       let data = {
            id: result.id,
            email_address: result.email_address,
            first_name: result.first_name,
            last_name: result.last_name,
            contact: result.contact,
            address: result.address
        }

        request.session.loggedin = true;
		request.session.data = data;

       return ({status:1, data: data })
    }
    
    return ({status:0, errorMessage: 'Invalid email and password'  })
}

const logout = async (req, res) => {
    if (req.session) {
        req.session.destroy(function(err) {
         console.log('Destroyed session')
        })
    }
    return ({status:1, successMessage: 'Logout success' })
}


const forgotPassword = async (request, response) => {
    const email = request.body.emailAddress;

    const result = await authModel.getUserUsingEmail(email);

    if (result) {
        let emailPassword = newPassword = generator.generate({
            length: 10,
            numbers: true
        });

        newPassword = md5(newPassword)
        console.log('emailPassword => ',emailPassword)
        console.log('newPassword => ',newPassword)
        const updateResult = await authModel.updateUserPassword(newPassword, result.id);
        console.log('updateResult => ',updateResult)
        if (updateResult) {
            let emailText = 'Hello ' +result.first_name+' '+result.last_name + ' Your New Password is ' + emailPassword
            let emailBody = {
                to: result.email_address,
                subject: 'New Password for 10D',
                body: emailText
            }
            
            const emailSentStatus = await emailService.sendEmail(emailBody)
            if (emailSentStatus) {
                return ({status:1, successMessage: 'Email sent with new password' })
            }  else {
                return ({status:0, errorMessage: 'Something is wrong, Please try later'  })
            }

        } else {
            return ({status:0, errorMessage: 'Something is wrong, Please try later'  })
        }

        return ({status:0, errorMessage: 'Something is wrong, Please try later'  })
    }
    
    return ({status:0, errorMessage: 'Invalid email address'  })
}

const changePassword = async (request, response) => {
    const oldPassword = request.body.oldPassword;
    const newPassword = request.body.newPassword;
    const confirmNewPassword = request.body.confirmNewPassword;

    if (newPassword !== confirmNewPassword)
        return ({status:0, errorMessage: 'New Password & Confirm New Password does not match!'  })

    const oldPasswordMatch = await authModel.verifyUserPassword(md5(oldPassword), request.session.data.id)

    if (!oldPasswordMatch)
        return ({status:0, errorMessage: 'Old Password does not match!'  })

    let password = md5(newPassword)
    const updateResult = await authModel.updateUserPassword(password, request.session.data.id);
    if (updateResult) {
        return ({status:1, successMessage: 'Password changed successfully ' })
    }

    return ({status:0, errorMessage: 'Something is wrong, Please try later' })
}

const updateProfile = async (request, response) => {
    const userData = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email_address: request.body.email_address,
        contact: request.body.contact,
        address: request.body.address
    };
    
    

    if (!userData.first_name && !userData.last_name && !userData.email_address)
        return ({status:0, errorMessage: 'Please enter mandatory fields!'  })

    const emailAddressExist = await authModel.checkEmailAddress(userData.email_address, request.session.data.id)

    if (emailAddressExist)
        return ({status:0, errorMessage: userData.email_address+' Email Address Already Exists!'  })

    const updateResult = await authModel.updateUserProfile(userData, request.session.data.id)
    if (updateResult) {
        userData.id = request.session.data.id
        request.session.data = userData
        return ({status:1, successMessage: 'Profile updated successfully ' })
    }

    return ({status:0, errorMessage: 'Something is wrong, Please try later' })
}

const test = (request, response) => {
  const value = request.body;
  response.send(value);
  console.log(value);
    };
    

module.exports = {
    login,
    logout,
    forgotPassword,
    changePassword,
    updateProfile,
    test
}
