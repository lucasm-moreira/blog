import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
    async viewIndex(req, res) {
        User.findAll().then(users => {
            res.render("admin/users/index", {users: users});
        });
    }

    async viewCreate(req, res) {
        res.render("admin/users/create");
    }
    
    async createUser(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        
        User.findOne({where:{email: email}}).then( user => {
            if(user == undefined){
    
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                
                User.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect("/");
                }).catch((err) => {
                    res.redirect("/");
                });
    
    
            }else{
                res.redirect("/admin/users/create");
            }
        });
    }

    async viewLogin(req, res) {
        res.render("admin/users/login");
    }
    
    async authenticate(req, res) {
        var email = req.body.email;
        var password = req.body.password;
    
        User.findOne({where:{email: email}}).then(user => {
            if(user != undefined){ // Se existe um usuário com esse e-mail
                // Validar senha
                var correct = bcrypt.compareSync(password, user.password);
    
                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.redirect("/admin/articles");
                }else{
                    res.redirect("/login"); 
                }
    
            }else{
                res.redirect("/login");
            }
        });
    }

    async logout(req, res) {
        req.session.user = undefined;
        res.redirect("/intestino");
    }
}

export default new UserController();