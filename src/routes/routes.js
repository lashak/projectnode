var User = require('../controllers/user');

exports.routeConfig=[
    {
        method: 'GET',
        path: '/getusers',
        config: User.getUsers
    },
    {
        method: 'POST',
        path: '/postuser',
        config: User.postUsers
    },
    
]
