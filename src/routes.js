import { Router } from 'express';
import adminAuthMiddleware from './app/middlewares/adminAuth';
import articleController from './app/controllers/articleController';
import categoryController from './app/controllers/categoryController';
import userController from './app/controllers/userController';

const routes = new Router();

// Rotas de login e autenticação
routes.get('/login', userController.viewLogin);
routes.post('/authenticate', userController.authenticate);
routes.get('/logout', userController.logout);

// Rotas de artigos sem autenticação
routes.get('/', articleController.getArticles);
routes.get('/:slug', articleController.getOneArticle);
routes.get('/articles/page/:num', articleController.articlePage);

// Rota de categoria sem autenticação
routes.get('/category/:slug', categoryController.getOneCategory);

// Todas as rotas abaixo desse middleware precisam estar autenticadas
routes.use(adminAuthMiddleware);

// Rotas de usuário
routes.get('/admin/users', userController.viewIndex);
routes.get('/admin/users/create', userController.viewCreate);
routes.post('/users/create', userController.createUser);

// Rotas de artigos
routes.get('/admin/articles', articleController.viewIndex);
routes.get('/admin/articles/new', articleController.viewCreate);
routes.get('/admin/articles/edit/:id', articleController.viewEdit);
routes.post('/articles/update', articleController.editArticle);
routes.post('/articles/save', articleController.createArticle);
routes.post('/articles/delete', articleController.deleteArticle);

// Rotas de categorias
routes.get('/admin/categories/new', categoryController.viewCreate);
routes.get('/admin/categories/edit/:id', categoryController.viewEdit);
routes.get('/admin/categories', categoryController.viewIndex);
routes.post('/categories/save', categoryController.createCategory);
routes.post('/categories/delete', categoryController.deleteCategory);
routes.post('/categories/update', categoryController.editCategory);

export default routes;
