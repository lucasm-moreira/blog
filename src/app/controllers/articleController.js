import slugify from 'slugify';
import Category from '../models/Category';
import Article from '../models/Article';

class ArticleController {
  async getArticles(req, res) {
    Article.findAll({
      order: [['id', 'DESC']],
      limit: 4,
    }).then((articles) => {
      Category.findAll().then((categories) => {
        res.render('index', { articles, categories });
      });
    });
  }

  async getOneArticle(req, res) {
    const { slug } = req.params;
    Article.findOne({
      where: {
        slug,
      },
    })
      .then((article) => {
        if (article !== undefined) {
          Category.findAll().then((categories) => {
            res.render('article', { article, categories });
          });
        } else {
          res.redirect('/');
        }
      })
      .catch((err) => {
        res.redirect('/');
      });
  }

  async viewIndex(req, res) {
    Article.findAll({
      include: [{ model: Category }],
    }).then((articles) => {
      res.render('admin/articles/index', { articles });
    });
  }

  async viewCreate(req, res) {
    Category.findAll().then((categories) => {
      res.render('admin/articles/new', { categories });
    });
  }

  async createArticle(req, res) {
    const { title } = req.body;
    const { body } = req.body;
    const { category } = req.body;

    Article.create({
      title,
      slug: slugify(title),
      body,
      categoryId: category,
    }).then(() => {
      res.redirect('/admin/articles');
    });
  }

  async deleteArticle(req, res) {
    const { id } = req.body;
    if (id !== undefined) {
      if (!isNaN(id)) {
        Article.destroy({
          where: {
            id,
          },
        }).then(() => {
          res.redirect('/admin/articles');
        });
      } else {
        // NÃO FOR UM NÚMERO
        res.redirect('/admin/articles');
      }
    } else {
      // NULL
      res.redirect('/admin/articles');
    }
  }

  async viewEdit(req, res) {
    const { id } = req.params;
    Article.findByPk(id)
      .then((article) => {
        if (article !== undefined) {
          Category.findAll().then((categories) => {
            res.render('admin/articles/edit', {
              categories,
              article,
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

  async editArticle(req, res) {
    const { id } = req.body;
    const { title } = req.body;
    const { body } = req.body;
    const { category } = req.body;

    Article.update(
      { title, body, categoryId: category, slug: slugify(title) },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        res.redirect('/admin/articles');
      })
      .catch((err) => {
        res.redirect('/');
      });
  }

  async articlePage(req, res) {
    const page = req.params.num;
    let offset = 0;

    if (isNaN(page) || page == 1) {
      offset = 0;
    } else {
      offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({
      limit: 4,
      offset,
    }).then((articles) => {
      let next;
      if (offset + 4 >= articles.count) {
        next = false;
      } else {
        next = true;
      }

      const result = {
        page: parseInt(page),
        next,
        articles,
      };

      Category.findAll().then((categories) => {
        res.render('admin/articles/page', {
          result,
          categories,
        });
      });
    });
  }
}

export default new ArticleController();
