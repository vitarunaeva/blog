const express = require('express');
const cors = require('cors');
const routes = express.Router();
// контроллеры для маршрутов
const createPostController = require('./controllers/createPostController');
const getAllPostController = require('./controllers/getAllPostsController');
const getPostController = require('./controllers/getPostController');
const deletePostController = require('./controllers/deletePostController');
const getEditPostController = require('./controllers/getEditPostController');
const editPostController = require('./controllers/editPostController');
const loginCheckController = require('./controllers/loginCheckController');
const createUserController = require('./controllers/createUserController');
const getPostsController = require('./controllers/getPostsController');
const logoutController = require('./controllers/logoutController');
const renderDeletePage = require('./controllers/renderDeletePage');


const checkAuth = (req, res, next) => {
    console.log(req.session.auth);
    if (req.session.auth === 'ok') {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkLogin = (req, res, next) => {
    if (req.session.auth === 'ok') {
        res.redirect('/posts');
    } else {
        next();
    }
};

routes.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

routes.use(cors());
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));


// маршрут /post для создания, удаления, изменения постов
routes
    .route('/post')
    .post(createPostController)
    .put(editPostController)
    .delete(deletePostController);

// для перехода на страницу удаления поста, если пользователь залогинен
routes
    .get('/delete/:id',checkAuth, renderDeletePage);

// для получения списка всех постов
routes
    .route('/allposts')
    .get(getAllPostController);

// отдает html файл со списком постов
routes
    .route('/posts')
    .get(getPostsController);
// .get((req, res) => {
//     res.sendFile('client/posts/posts.html', {root: __dirname })
// });


// отдает html файл со страницей добавления поста
routes
    .route('/create-post')
    .get((req, res) => {
        res.sendFile('client/create-post/create-post.html', {root: __dirname })
    });

routes
    .route('/logout')
    .get(logoutController);

// для проверки логина пароля
routes
    .route('/logincheck')
    .post(loginCheckController);


// для добавления нового пользователя
routes
    .route('/create-user')
    .get((req,res) => {
        res.sendFile('client/create-user/create-user.html', {root: __dirname })
    })
    .post(createUserController);

// отдает html файл со страницей login
routes
    .get('/login', checkLogin, (req, res) => {
        res.sendFile('client/login/login.html', {root: __dirname })
    })
    // рендерит страницу определенного поста
    .get('/post/:id', getPostController)

    // рендерит страницу изменения определенного поста
    .get('/edit/:id', checkAuth, getEditPostController);


module.exports = routes;
