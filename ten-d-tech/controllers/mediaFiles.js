const fileUploadService = require('../services/fileUpload')

const add = async (request, response) => {
    const fileType = request.body.fileType;
    const mediaFile = request.body.mediaFile;
    console.log('fileType => ',fileType)
    console.log('mediaFile => ',mediaFile)
    /*
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
    */

    return ({status:0, errorMessage: 'Something is wrong, Please try later' })
}

module.exports = {
     add
}