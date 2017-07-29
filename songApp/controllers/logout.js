const session = require('express-session');

export default (req, res) => {  
  req.session.destroy();
  req.logout();  
  res.redirect('/login');  
};

