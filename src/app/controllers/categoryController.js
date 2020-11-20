import slugify from 'slugify';
import Category from '../models/Category';
import Article from '../models/Article';

class CategoryController {
    async getOneCategory(req, res) {
        var slug = req.params.slug;
        Category.findOne({
            where: {
                slug: slug
            },
            include: [{model: Article}]
        }).then( category => {
            if(category != undefined){
                Category.findAll().then(categories => {
                    res.render("index",{articles: category.articles,categories: categories});
                });
            }else{
                res.redirect("/");
            }
        }).catch( err => {
            res.redirect("/");
        })
    }

    async viewCreate(req, res) {
        res.render("admin/categories/new");
    }

    async createCategory(req, res) {
        var title = req.body.title;
        if(title != undefined){
            
            Category.create({
                title: title,
                slug: slugify(title)
            }).then(() => {
                res.redirect("/admin/categories");
            })
    
        }else{
            res.redirect("/admin/categories/new");
        }
    }

    async viewIndex(req, res) {
        Category.findAll().then(categories => {
            res.render("admin/categories/index", {categories: categories});
        });
    }

    async deleteCategory(req, res) {
        var id = req.body.id;
        if(id != undefined){
            if(!isNaN(id)){
                Category.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.redirect("/admin/categories");
                });
            }else{// NÃO FOR UM NÚMERO
                res.redirect("/admin/categories");
            }
        }else{ // NULL
            res.redirect("/admin/categories");
        }
    }

    async viewEdit(req, res) {
        var id = req.params.id;

        if(isNaN(id)){
            res.redirect("/admin/categories"); 
        }
    
        Category.findByPk(id).then(category => {
            if(category != undefined){
                res.render("admin/categories/edit",{category: category});
            }else{
                res.redirect("/admin/categories");
            }
        }).catch(erro => {
            res.redirect("/admin/categories");        
        })
    }

    async editCategory(req, res) {
        var id = req.body.id;
        var title = req.body.title;
    
        Category.update({title: title, slug: slugify(title) },{
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/categories");    
        })
    }
}

export default new CategoryController();