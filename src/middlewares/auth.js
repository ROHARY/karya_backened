async function authenticate(req, res, next){
  console.log('Authenticating the user....')

  if(req.originalUrl.includes('sign-in') || req.originalUrl.includes('sign-up')){
    console.log('Skipping authentication..')
    return next()
  } 
  let token =  (req.headers?.authorization?.startsWith?.('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null) || (req.cookies && req.cookies['token']);
  if(!token){
    return res.status(401).send('Invalid credentials')
  }
  const user = await global.models.user.findOne({_id: token})
  req.user = user
  next()
}
module.exports = authenticate