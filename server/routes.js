const champions = require('./static/champions.json');
const items = require('./static/items.json');
const summoner = require('./static/summoner.json');
const runeData = require('./static/runes.json');


const { API_KEY, PLATFORM_ID } = require('./config');

const LeagueJs = require('leaguejs');
const leagueJs = new LeagueJs(API_KEY, { PLATFORM_ID });



module.exports = (app) => {

    app.get('/getSummonerByName/:name', async (req, res) => {
        try {
            const summoner = await leagueJs.Summoner.gettingByName(req.params.name);
            res.status(200).json(summoner);
        }
        catch (e) {
            res.status(400).json(e);
        }
    });


    app.get('/getSummonerMatches/:accountId', async (req, res) => {
        try {
            const matches = await leagueJs.Match.gettingListByAccount(req.params.accountId);
            const latestMatches = matches.matches.slice(0, 10);

            res.status(200).json(latestMatches);
        }
        catch (e) {
            res.status(400).json(e);
        }
    })

    app.get('/getMatchById/:matchId/:accountId', async (req, res) => {
        try {

            const match = await leagueJs.Match.gettingById(req.params.matchId);
            const matchTimeline = await leagueJs.Match.gettingTimelineById(match.gameId);
            const participantIdent = match.participantIdentities.find(identity => identity.player.accountId == req.params.accountId);
            const participant = match.participants.find(participant => participantIdent.participantId == participant.participantId);

            let championName;
            Object.keys(champions.data).map(champ => {
                if (champions.data[champ].key == participant.championId) {
                    championName = champions.data[champ].name;
                }
            })


            const jungleMinionsKilled =
                matchTimeline.frames[matchTimeline.frames.length - 1].participantFrames[participant.participantId].jungleMinionsKilled;

            const minionsKilled =
                matchTimeline.frames[matchTimeline.frames.length - 1].participantFrames[participant.participantId].minionsKilled;

            const gameDuration = Math.floor(match.gameDuration / 60);

            let itemsArr = []
            itemsArr.push(participant.stats.item0, participant.stats.item1, participant.stats.item2, participant.stats.item3, participant.stats.item4, participant.stats.item5, participant.stats.item6);

            let itemsPurchased = [];
            Object.keys(items.data).map(item => {
                itemsArr.forEach(jsonItem => {
                    if (jsonItem == item) {
                        itemsPurchased.push(items.data[item]);
                    }
                })
            })

            let spells = [];
            Object.keys(summoner.data).map(spell => {
                if (summoner.data[spell].key == participant.spell1Id || summoner.data[spell].key == participant.spell2Id) {
                    spells.push(summoner.data[spell]);
                }
            });

            const runes = runeData.filter(rune => {
                return (participant.stats.perkPrimaryStyle == rune.id || participant.stats.perkSubStyle == rune.id)
            })

            const kda = participant.stats.kills + '/' + participant.stats.deaths + '/' + participant.stats.assists;

            let matchData = {
                outcome: participant.stats.win,
                gameDuration: gameDuration + ' minutes',
                totalCreeps: jungleMinionsKilled + minionsKilled,
                creepScorePerMinute: (jungleMinionsKilled + minionsKilled) / gameDuration,
                championName: championName,
                championLevel: participant.stats.champLevel,
                itemsPurchased: itemsPurchased,
                spells: spells,
                runes: runes,
                kda: kda
            }

            res.status(200).json(matchData);
        }
        catch (e) {
            console.log(e.stack);
            res.status(400).json(e);
        }
    })

};