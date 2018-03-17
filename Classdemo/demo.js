const http = require...
url 
querystring 


//endpoints external files vvvvv//
Router 
simpleAPI 
gamesAPI 
//////////// const require the above
// Router http request and rest requests. 
router = new Router() 
router.get('/text', simpleAPI.text);
router.get('/json', simple.API.json);

router.get('games', gameAPI.getGames)
router.post('games', gamesAPI.CreateGames)

///listening to server stuff bellow//
const PORT = 3000 || process.env;
..
..

