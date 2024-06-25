// import {listen, get} from './src/app.js';

// listen(get('port'), () => {
//     console.log('Server listen on port ' + get('port'));
// });

const app = require("./app");

app.listen(process.env.PORT || 3000);
