const axios = require('axios');


class CoreProfile {
    constructor(profile){
        this.username = profile.userName
        this.id = profile.accountId
        this.isSuspended = profile.isSuspended
        this.questLevel = profile.questLevel
    }   
    getAdvanced = async function() {
        let advancedInfo
        await axios.get(`https://www.coregames.com/api/account/${this.id}`).then(res => {
            advancedInfo = res.data.profile
        })
        return new CoreProfileAdvanced(advancedInfo)
    }
}

class CoreProfileAdvanced {
    constructor(profile){
        this.created = profile.createdAtDate
        this.description = profile.description
        this.id = profile.id
        this.isSuspended = profile.isSuspended
        this.profilePictureId = profile.profilePictureId
        this.profilePictureUrl = 'https://www.coregames.com/api/profilepictures/' + this.profilePictureId
        this.questLevel = profile.questLevel
        this.username = profile.userName
        this.social = profile.socialMedia

    }   

    getLikedGames = async function() {
        let returnVal = []
        await axios.post(`https://www.coregames.com/api/game/likedby/${this.id}`, {}).then(res => {
            res.data.games.forEach(game => {
                returnVal.push(new CoreGame(game))
            })
        })
        return returnVal
    }

    getCreatedGames = async function() {
        let returnVal = []
        await axios.post(`https://www.coregames.com/api/game/ownedby/${this.id}`, {}).then(res => {
            res.data.games.forEach(game => {
                returnVal.push(new CoreGame(game))
            })
        })
        return returnVal
    }

    getRecentlyPlayedGames = async function() {
        let returnVal = []
        await axios.post(`https://www.coregames.com/api/game/recently_played_by/${this.id}`, {}).then(res => {
            res.data.games.forEach(game => {
                returnVal.push(new CoreGame(game))
            })
        })
        return returnVal
    }

    getCommunityContent = async function(continuationToken = '', sortOptions = 'MostDownloaded') {
        let returnVal = []
        await axios.post('https://www.coregames.com/api/Template/search_v2?searchTerm=', {
            'continuationToken': continuationToken,
            'sortOptions': sortOptions,
            'reverseSort': false,
            'categories': null,
            'ownerID': this.id }, {
                headers: {
                    'AuthToken': authToken
                }
            }    
        ).then(res => {
            res.data.items.forEach(CC => {
                returnVal.push(new CommunityContent(CC))
            })
        })

        return returnVal
    }
}

class CoreGame {
    constructor(game){
        this.id = game.id;
        this.ownerName = game.ownerUserName
        this.maxPlayers = game.maxPlayers
        this.slugname = game.slugName
        this.thumbnail = game.thumbUrl
        this.shortUrl = game.selfUrl
        this.plays = game.plays
        this.name = game.name
    }

    getAdvanced = async function() {
        let advancedInfo
        await axios.get(`https://www.coregames.com/api/game/${this.shortUrl}`).then(res => {
            advancedInfo = new CoreGameAdvanced(res.data.game)

        })
        return advancedInfo
    }

    getComments = async function(continuationToken = '') {
        let returnVal = []
        await axios.post('https://www.coregames.com/api/review/query_comments', {continuationToken: continuationToken, 
                                                                                order: "Newest", 
                                                                                resourceId: this.id,
                                                                                type: "Game"})
        .then(res => {
            res.data.comments.forEach(comment => {
                returnVal.push(new CoreComment(comment))
            })
        })    
        return returnVal                                                                  
    }
}

class CoreGameAdvanced {
    constructor(game){
        this.ownerProfile = new CoreProfile(game.ownerAccount)
        this.created = game.created
        this.description = game.description
        this.cubemap = game.cubeMap
        this.downloadUrl = game.downloadUrl
        this.gameVersion = game.gameVersion
        this.id = game.id
        this.isAllowedToDirectJoin = game.isAllowedToDirectJoin
        this.isBanned = game.isBanned
        this.isUnlisted = game.isPrivate
        this.isQueued = game.isQueued
        this.minPlayersToStart = game.minPlayersToStart
        this.maxPlayers = game.maxPlayers
        this.name = game.name
        this.rating = game.rating
        this.releaseNotes = game.releaseNotes
        this.screenshots = game.screenshots
        this.tags = game.tags
        this.updated = game.updated
    }


    getComments = async function(continuationToken ='') {
        let returnVal = []
        await axios.post('https://www.coregames.com/api/review/query_comments', {continuationToken: continuationToken, 
                                                                                order: "Newest", 
                                                                                resourceId: this.id,
                                                                                type: "Game"})
        .then(res => {
            res.data.comments.forEach(comment => {
                returnVal.push(new CoreComment(comment))
            })
        })    
        return returnVal                                                                  
    }
}

class CoreComment {
    constructor(comment){
        this.id = comment.commentId;
        this.createdDate = comment.created;
        this.message = comment.message;
        this.profile = new CoreProfile(comment.profile);
        this.rating = comment.rating;
        this.replyCount = comment.replyCount;
    }

    getReplies = async function(continuationToken = '') {
        let returnVal = []
        if (this.replyCount > 0) {
            await axios.post('https://www.coregames.com/api/review/query_comments', {continuationToken: continuationToken, 
                                                                                    order: "Newest", 
                                                                                    resourceId: this.id,
                                                                                    type: "Comment"})
            .then(res => {
                res.data.comments.forEach(comment => {
                    returnVal.push(new Comment(comment))
                })
            })                                                                      
        } 
        return returnVal
    }
}

class CommunityContent {
    constructor(CommunityContent) {
        this.id = CommunityContent.id
        this.name = CommunityContent.name
        this.rating = CommunityContent.rating
        this.thumbnailUrl = CommunityContent.thumbUrl
        this.ownerId = CommunityContent.ownerId
        this.ownerName = CommunityContent.ownerName
        this.version = CommunityContent.latestVersion
        this.downloads = CommunityContent.downloadCount
    }

    getOwnerProfile = async function() {
        let advancedInfo
        await axios.get(`https://www.coregames.com/api/account/${this.ownerId}`).then(res => {
            advancedInfo = res.data.profile
        })
        return new CoreProfileAdvanced(advancedInfo)
    }

    getAdvanced = async function() {
        let advancedInfo
        await axios.get('https://www.coregames.com/api/Template/'+ this.id).then(res => {
            advancedInfo = new CommunityContentAdvanced(res.data.template)
        })
        return advancedInfo
    }
}

class CommunityContentAdvanced {
    constructor(CommunityContent) {
        this.id = CommunityContent.id
        this.created = CommunityContent.created
        this.updated = CommunityContent.updated
        this.name = CommunityContent.name
        this.description = CommunityContent.description
        this.tags = CommunityContent.tags
        this.ownerProfile = new CoreProfile(CommunityContent.owner)
        this.screenshots = CommunityContent.screenshots
        this.thumnails - CommunityContent.thumnails
        this.content = CommunityContent.content
        this.rating = CommunityContent.rating
        this.downloads = CommunityContent.downloadCount
        this.version = CommunityContent.latestVersion
        this.category = CommunityContent.category
        this.subcategory = CommunityContent.subcategory
    }

    getOwnerProfile = async function() {
        let advancedInfo
        await axios.get(`https://www.coregames.com/api/account/${this.ownerProfile.id}`).then(res => {
            advancedInfo = res.data.profile
        })
        return new CoreProfileAdvanced(advancedInfo)
    }

}

/*

    Still WIP
    class CoreShopBundle {
        constructor(Bundle) {
            this.name = Bundle.name
            this.id = Bundle.id
            this.image = Bundle.imageUrl
            this.cards = Bundle.cards
            this.purchaseLimit = Bundle.purchaseLimit
            this.contentGrants = Bundle.contentGrants
            this.tokenGrants = Bundle.tokenGrants
            this.priceUSD = Bundle.price
            this.priceInCredits = Bundle.priceInVirtualTokens.amount
        }

    }
*/
exports.CoreComment = CoreComment
exports.CoreProfileAdvanced = CoreProfileAdvanced
exports.CoreProfile = CoreProfile
exports.CoreGameAdvanced = CoreGameAdvanced
exports.CoreGame = CoreGame
exports.CommunityContent = CommunityContent
exports.CommunityContentAdvanced = CommunityContentAdvanced