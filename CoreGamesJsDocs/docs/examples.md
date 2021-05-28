# Examples

### Get Comments from #1 Active Game
    async function example1() {
        let activeGames = await Platform.getActiveGames()
        let game = activeGames[0] //First Active Game. <CoreGame>
        let comments = await game.getComments() //Get Comments <CoreComment>
        comments.forEach(comment => {
            console.log(comment.profile.username + ': ' + comment.message)//Prints "Username: Message"
        })
    }

### Get the Community Content from people who have published a game that shows up with the search 'Example'.
    async function example2() {
        let games = await Platform.searchGames('Example')
        let authToken = await Platform.login(config.coreEmail, config.corePassword)
        games.forEach(game => {
            game.getAdvanced().then(advancedInfo => {
                advancedInfo.ownerProfile.getAdvanced().then(creatorInfo => {
                    creatorInfo.getCommunityContent(authToken).then(CommunityContent => {
                        console.log(CommunityContent)
                    })
                })
            })
        })
    }