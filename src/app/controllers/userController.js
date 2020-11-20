import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
  async viewIndex(req, res) {
    User.findAll().then((users) => {
      res.render('admin/users/index', { users });
    });
  }

  async viewCreate(req, res) {
    res.render('admin/users/create');
  }

  async createUser(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    User.findOne({ where: { email } }).then((user) => {
      if (user == undefined) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          email,
          password: hash,
        })
          .then(() => {
            res.redirect('/');
          })
          .catch((err) => {
            res.redirect('/');
          });
      } else {
        res.redirect('/admin/users/create');
      }
    });
  }

  async viewLogin(req, res) {
    res.render('admin/users/login');
  }

  async authenticate(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    User.findOne({ where: { email } }).then((user) => {
      if (user !== undefined) {
        // Se existe um usuário com esse e-mail
        // Validar senha
        const correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          req.session.user = {
            id: user.id,
            email: user.email,
          };
          res.redirect('/admin/articles');
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    });
  }

  async logout(req, res) {
    req.session.user = undefined;
    res.redirect('/');
  }
}

export default new UserController();
