import router from './router.js';

const App = () => {
    console.log("CareerPath App Iniciado!");

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
};

App();