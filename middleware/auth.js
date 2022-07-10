module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    // req.flash('warning_msg', '請先登入才能使用！')
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  }
}
