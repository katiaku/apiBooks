import {listen, get} from './app.js';

listen(get('port'), () => {
    console.log('Server listen on port ' + get('port'));
});
