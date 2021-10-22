# API
## Platform

### Methods
* `Platform.getActiveGames()` -> `Array<`[CoreGame](#coregame)`>`
* `Platform.getTopGames()` -> `Array<`[CoreGame](#coregame)`>`
* `Platform.searchCommunityContent(searchTerm, sortOrder, continuationToken)` -> `Array<`[CommunityContent](#communitycontent)`> All fields are optional.
* `Platform.searchUsers(searchTerm)` -> `Array<`[CoreProfile](#coreprofile)`>`
* `Platform.searchGames(searchTerm)` ->  `Array<`[CoreGame](#coregame)`>`
* `Platform.getUserById(id)`         ->  [CoreProfileAdvanced](#coreprofileadvanced)

## CoreGame
### Properties
* `CoreGame.id`         -> `String` Ex.  `13661432b4594b80944d00021f873f89`
* `CoreGame.ownerName`  -> `String` Ex. `Aphrim`
* `CoreGame.maxPlayers` -> `Int`    Ex. `8`
* `CoreGame.slugname`   -> `String` Ex. `asdfasdfasd`
* `CoreGame.thumbnail`  -> `String` Ex. `https://manticoreprod.azureedge.net/thumbs/randomString.jpg`
* `CoreGame.shortUrl`   -> `String` Ex. `160531/dodgeball`
* `CoreGame.plays`      -> `Int`    Ex. `1337`
* `CoreGame.name`       -> `String` Ex. `Shrek Swamp FFA`
### Methods
* `CoreGame.getAdvanced()`   -> [CoreGameAdvanced](#coregameadvanced)
* `CoreGame.getComments()`   -> `Array<`[CoreComment](#corecomment)`>`


## CoreGameAdvanced
### Properties
* `CoreGameAdvanced.ownerProfile`           -> [CoreProfile](#coreprofile)
* `CoreGameAdvanced.created`                -> `String`    Ex. `2021-01-16T02:59:46.9851728Z`
* `CoreGameAdvanced.description`            -> `String`    Ex. `A string of text sometimes very long`
* `CoreGameAdvanced.cubemap`                -> `String`    Ex. `https://manticoreprod.azureedge.net/thumbs/LongRandomStringLetsGo_cubemap.png`
* `CoreGameAdvanced.downloadUrl`            -> `String`    Ex. `https://manticoreprod.azureedge.net/games/SemiLongRandStringLetsGo.zip`
* `CoreGameAdvanced.gameVersion`            -> `String`    Ex. `1.0.69`
* `CoreGameAdvanced.id`                     -> `String`    Ex  `07713cbea0624b3f81e7e22c20dc5b9e`
* `CoreGameAdvanced.isAllowedToDirectJoin`  -> `Bool`      Ex. `true` *Part of Queue System*
* `CoreGameAdvanced.isBanned`               -> `Bool`      Ex. `false`
* `CoreGameAdvanced.isUnlisted`             -> `Bool`      Ex. `false`
* `CoreGameAdvanced.isQueued`               -> `Bool`      Ex. `false`
* `CoreGameAdvanced.minPlayersToStart`      -> `Int`       Ex. `7` *Part of Queue System*
* `CoreGameAdvanced.maxPlayers`             -> `Int`       Ex. `15`
* `CoreGameAdvanced.name`                   -> `String`    Ex. `Cannons and Corsairs`
* `CoreGameAdvanced.rating`                 -> `Table`     Ex. `{liked: 99, disliked: 99, percent: 0.9}`
* `CoreGameAdvanced.releaseNotes`           -> `String`    Ex. `CoreGamesJS V0.1 Cool Stuff in new update`
* `CoreGameAdvanced.screenshots`            -> `Array<String>` Ex. `['ScreenshotURL', 'ScreenshotURL', 'ScreenshotURL']`
* `CoreGameAdvanced.tags`                   -> `Array<String>` Ex. `['Racing', 'FFA', 'OtherCoolTags']`
* `CoreGameAdvanced.updated`                -> `String`    Ex. `2021-05-27T05:46:47.9477627`
### Methods
* `CoreGameAdvanced.getComments()`          -> `Array<`[CoreComment](#corecomment)`>`
## CoreProfile
Default return value for most things that return a core profile. More advanced info can be used with `.getAdvanced()`
### Properties
* `CoreProfile.username`                    -> `String`    Ex. `Aphrim`
* `CoreProfile.id`                          -> `String`    Ex. `a7fa1014cab64595bee90b0049070c8e`
* `CoreProfile.isSuspended`                 -> `Bool`      Ex. `false`
* `CoreProfile.questLevel`                  -> `Int`       Ex. `48`
### Methods
* `CoreProfile.getAdvanced()`               -> [CoreProfileAdvanced](#coreprofileadvanced)
### Examples
        let users = await Platform.searchUsers('Aphrim')
        let moreDetail = await users[0].getAdvanced()
        console.log(moreDetail)

## CoreProfileAdvanced
### Properties
* `CoreProfileAdvanced.created`          -> `String`      Ex. `2020-01-07T00:00:00Z` Date at which profile was created
* `CoreProfileAdvanced.description`      -> `String`      Ex. `A very cool and long bio/description`
* `CoreProfileAdvanced.id`               -> `String`      Ex. `a7fa1014cab64595bee90b0049070c8e`
* `CoreProfileAdvanced.isSuspended`      -> `Bool`        Ex. `false`
* `CoreProfileAdvanced.profilePictureId` -> `String`      Ex. `08f08e685a3a467482f874c69fb407fd`
* `CoreProfileAdvanced.profilePictureUrl`-> `String`      Ex. `https://www.coregames.com/api/profilepictures/08f08e685a3a467482f874c69fb407fd`
* `CoreProfileAdvanced.questLevel`       -> `Int`         Ex. `48`
* `CoreProfileAdvanced.username`         -> `String`      Ex. `Aphrim`
* `CoreProfileAdvanced.social`           -> `Table`       Ex. `social: {discord: null,facebook: null,twitch: null,twitter: 'gregory_perrett',youtube: 'channel/UCqKcZtFh25bg2JyjoKkf4mg'}`
### Methods
* `CoreProfileAdvanced.getLikedGames()`    -> `Array<`[CoreGame](#coregame)`>`
* `CoreProfileAdvanced.getCreatedGames()`  -> `Array<`[CoreGame](#coregame)`>`
* `CoreProfileAdvanced.getRecentlyPlayedGames()` -> `Array<`[CoreGame](#coregame)`>`
* `CoreProfileAdvanced.getCommunityContent(continuationToken, sortOptions)` -> `Array<`[CommunityContent](#communitycontent)`>`

## CommunityContent
### Properties
* `CommunityContent.id`               -> `String` Ex. `1b8961f3480b4849afcdc56c0f50272e`
* `CommunityContent.description`      -> `String` Ex. `A very cool of community content that you should add to your games`
* `CommunityContent.name`             -> `String` Ex. `Shrek NPC AI system`
* `CommunityContent.rating`           -> `Table`  Ex. `{liked: 99, disliked: 0, percent: 1}`
* `CommunityContent.thumbnailUrl`     -> `String` Ex. `https://manticoreprod.azureedge.net/thumbs/bigidstring.jpg`      
* `CommunityContent.ownerId`          -> `String` Ex. `a7fa1014cab64595bee90b0049070c8e`
* `CommunityContent.ownerName`        -> `String` Ex. `Aphrim`
* `CommunityContent.version`          -> `String` Ex. `1.0.0`
* `CommunityContent.downloads`        -> `Int`    Ex. `1337`
### Methods
* `CommunityContent.getOwnerProfile`  -> [CoreProfileAdvanced](#coreprofileadvanced)
* `CommunityContent.getAdvanced()`    -> [CommunityContentAdvanced](#communitycontentadvanced)

## CommunityContentAdvanced

### Properties
* `CommunityContentAdvanced.id`       -> `String` Ex. `1b8961f3480b4849afcdc56c0f50272e`
* `CommunityContentAdvanced.created`  -> `String` Ex. `2020-09-06T19:16:06.3991856Z`
* `CommunityContentAdvanced.updated`  -> `String` Ex. `2020-09-06T19:16:10.003444Z`
* `CommunityContentAdvanced.name`     -> `String` Ex. `Obi-Wan's Light Saber`
* `CommunityContentAdvanced.description` -> `String` Ex. `Get chopped up`
* `CommunityContentAdvanced.tags`     -> `Array<String>` Ex. `['LightSaber', 'ObiWanKenobi', 'Star Wars']`
* `CommunityContentAdvanced.ownerProfile` -> [CoreProfile](#coreprofile)
* `CommunityContentAdvanced.screenshots` -> `Array<String>` Ex. `['LongUrl', 'AnotherLongUrl']`
* `CommunityContentAdvanced.content`   ->   `Array<Table>`  Ex. `[{id: 0, notes: null, url: 'https://manticoreprod.azureedge.net/templates/92f5cd3c999947bbbe92d3815d8d089f_1.0.0.zip', publishDate: '2020-09-20T15:40:20.9494353Z'}]`. If you need the ZIP files of the pbts included with the Community Content. A community content can have multiple templates so there may be more than 1 table in the array. The url contains a zip of the pbt.
* `CommunityContentAdvanced.rating`   -> `Table`   Ex. `{liked: 99, disliked: 0, percent: 1}`
* `CommunityContentAdvanced.downloads` -> `String` Ex. `9001`
* `CommunityContentAdvanced.version`  -> `String` Ex. `1.1.0`
* `CommunityContentAdvanced.category` -> `String` Ex. `Gameplay`
* `CommunityContentAdvanced.subcategory` -> `String` Ex. `Fun Stuff`
### Methods
* `CommunityContent.getOwnerProfile()` -> [CoreProfileAdvanced](#coreprofileadvanced)

## CoreComment
### Properties
* `CoreComment.id`    -> `String`  Ex. `b4a5bd6e483b47369446561233079fe8`
* `CoreComment.createdDate` -> `String` Ex. `2021-04-26T13:55:59.816006Z`
* `CoreComment.message`  -> `String`  Ex. `Epic Game`
* `CoreComment.profile` -> [CoreProfile](#coreprofile)
* `CoreComment.rating`  -> `Table` Ex. `{ liked: 0, disliked: 0, percent: 0 }`
* `CoreComment.replyCount` -> `Int` Ex. `0`
### Methods
* `CoreComment.getReplies([continuationToken])` -> `Array<`[CoreComment](#corecomment)`>` *Specifying continuationToken is optional and would rarely be used, only with comments with more than 50 replies so that you can see beyond the first 50 replies if you need to for some reason.*