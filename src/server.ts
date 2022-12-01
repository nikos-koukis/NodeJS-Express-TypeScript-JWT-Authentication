import app from './app';
import './database/database';

function main() {
    app.listen(app.get('port'));
    console.log('Server listening on port', app.get('port'));
}

main();