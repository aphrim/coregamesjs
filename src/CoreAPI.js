const axios = require('axios')
const { CoreGame, CommunityContent, CoreProfile, CoreShopBundle, CoreProfileAdvanced } = require('./Classes.js')
let Game = {}
let Platform = {}
//Return Type: Array<CoreGame>
Platform.getActiveGames = async function () {
    let returnVal = []
    await axios.post('https://www.coregames.com/api/game/most_active', {}).then(res => {
        res.data.games.forEach(game => {
            returnVal.push(new CoreGame(game))
        })
    })
    return returnVal
}

//Return Type: Array<CoreGame>
Platform.getTopGames = async function () {
    let returnVal = []
    await axios.post('https://www.coregames.com/api/game/top_games', {}).then(res => {
        res.data.games.forEach(game => {
            returnVal.push(new CoreGame(game))
        })
    })
    return returnVal
}

Platform.searchCommunityContent = async function(searchTerm ='',sortOrder = 'MostDownloaded', continuationToken = '') {
    let returnVal = []
    await axios.post('https://www.coregames.com/api/Template/search_v2?searchTerm=' + searchTerm, {
    'continuationToken': continuationToken,
    'sortOptions': sortOrder,
    'reverseSort': false,
    'categories': null
    }).then(res => {
        res.data.items.forEach(communityContent => {
            returnVal.push(new CommunityContent(communityContent))
        })
    })
    return returnVal
}

Platform.searchUsers = async function(searchTerm = '') {
    returnVal = []
    await axios.post('https://www.coregames.com/api/search', {
        name: searchTerm
    })
    .then(res => {
        res.data.profiles.forEach(profile => {
           profile.accountId = profile.id
           returnVal.push(new CoreProfile(profile))
        })
    })
    return returnVal
}

Platform.searchGames = async function(searchTerm = '') { 
    returnVal = []
    await axios.post('https://www.coregames.com/api/search',{
        name: searchTerm
    })
    .then(res => {

        res.data.games.forEach(game => {
            returnVal.push(new CoreGame(game))
        })
    })

    return returnVal
}

Platform.getUserByID = async function(id = '') {
    let returnVal
    await axios.get(`https://www.coregames.com/api/account/` + id).then(res => {
        returnVal = new CoreProfileAdvanced(res.data.profile)
    })
    return returnVal
}
/*
    STILL WIP AND NOT WORKING.

    Platform.getShop = async function() {
        returnVal = []
        await axios.get('https://www.coregames.com/api/Store/pages')
        .then(res => {
            returnVal = res.data
        })
        return returnVal
    }

    Platform.getShopPage = async function(id) {
        returnVal = []
        await axios.get('https://www.coregames.com/api/Store/pages/' + id).then(pageData => {

            returnVal.push(pageData.data.page)
            let p = 0
            console.log(page)
            returnVal.forEach(page => {
                b=0
                page.bundles.forEach(bundle => {
                    bundle = new CoreShopBundle(bundle)
                    returnVal[p].bundles[b] = bundle
                    b+=1
                })
                p+=1
            })
        })
        return returnVal
    }
*/


module.exports = {Platform, Game}