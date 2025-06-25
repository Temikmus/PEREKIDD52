const { createServer } = require('http');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(handle).listen(3000, () => {
        console.log('Сайт работает на порту 3000!');
    });
});