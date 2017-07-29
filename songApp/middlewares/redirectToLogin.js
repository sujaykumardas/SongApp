
export default (req, res, next) => {
  if(typeof req.user !== 'undefined'|| req.url==='/login' || req.url==='/signup'){
  	next();
  }
  else {
    res.redirect('/login');
  }
};