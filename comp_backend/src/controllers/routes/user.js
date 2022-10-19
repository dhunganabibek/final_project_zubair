const userService =  require('../../services/user')
module.exports = function(router) {
    router.get('/users', (req, res) => {
        userService.getAllUsers().then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
    router.post('/user', (req, res) =>{
        userService.saveUser(req).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
    router.put('/user/:id', (req, res) =>{
        userService.updateUser(req).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
    router.delete('/user/:id', (req, res) =>{
        userService.deleteUser(req).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
    router.get('/user', (req, res) =>{
        userService.getUser(req).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
    router.get('/user/:id', (req, res) =>{
        userService.getUserById(req).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
    router.get('/users/ids', (req, res) =>{
        userService.getContacts(req).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json(err);
        })
    })
}