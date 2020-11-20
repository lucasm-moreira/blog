import slugify from 'slugify';
import Category from '../models/Category';
import Article from '../models/Article';

class CategoryController {
  async getOneCategory(req, res) {
    const { slug } = req.params;
    Category.findOne({
      where: {
        slug,
      },
      include: [{ model: Article }],
    })
      .then((category) => {
        if (category !== undefined) {
          Category.findAll().then((categories) => {
            res.render('index', {
              articles: category.articles,
              categories,
            });
          });
        } else {
          res.redirect('/');
        }
      })
      .catch((err) => {
        res.redirect('/');
      });
  }

  async viewCreate(req, res) {
    res.render('admin/categories/new');
  }

  async createCategory(req, res) {
    const { title } = req.body;
    if (title !== undefined) {
      Category.create({
        title,
        slug: slugify(title),
      }).then(() => {
        res.redirect('/admin/categories');
      });
    } else {
      res.redirect('/admin/categories/new');
    }
  }

  async viewIndex(req, res) {
    Category.findAll().then((categories) => {
      res.render('admin/categories/index', { categories });
    });
  }

  async deleteCategory(req, res) {
    const { id } = req.body;
    if (id !== undefined) {
      if (!isNaN(id)) {
        Category.destroy({
          where: {
            id,
          },
        }).then(() => {
          res.redirect('/admin/categories');
        });
      } else {
        // NÃO FOR UM NÚMERO
        res.redirect('/admin/categories');
      }
    } else {
      // NULL
      res.redirect('/admin/categories');
    }
  }

  async viewEdit(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      res.redirect('/admin/categories');
    }

    Category.findByPk(id)
      .then((category) => {
        if (category != undefined) {
          res.render('admin/categories/edit', { category });
        } else {
          res.redirect('/admin/categories');
        }
      })
      .catch((err) => {
        res.redirect('/admin/categories');
      });
  }

  async editCategory(req, res) {
    const { id } = req.body;
    const { title } = req.body;

    Category.update(
      { title, slug: slugify(title) },
      {
        where: {
          id,
        },
      }
    ).then(() => {
      res.redirect('/admin/categories');
    });
  }
}

export default new CategoryController();
