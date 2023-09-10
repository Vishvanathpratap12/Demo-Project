

const isLoggedIn = (req, res, next) => {
    if (req.session.loggedin && req.session.data && req.session.data.id)
        next()
    else 
        res.redirect('login')
}

const isNotLogIn = (req, res, next) => {
    if (req.session.loggedin && req.session.data && req.session.data.id)
    res.redirect('dashboard')
    else 
        next()
}

module.exports = {
    isLoggedIn,
    isNotLogIn
}