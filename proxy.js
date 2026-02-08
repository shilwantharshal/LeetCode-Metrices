const corsAnywhere = require('cors-anywhere');

corsAnywhere.createServer({
    originWhitelist: [],
}).listen(8080,()=>{
    console.log('CORS proxy running on http://localhost:8080');
})