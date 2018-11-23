import React from 'react';

const Stats = ({ matchData }) => {
    if (!matchData) {
        return null;
    } else {
        
        const spells = matchData.spells.map(spell => {
            return <li key={spell.id}>{spell.name}</li>
        })

        const runes = matchData.runes.map(rune => {
            return <li key={rune.id}>{rune.name}</li>
        })

        const itemsPurchased = matchData.itemsPurchased.map((item, i) => {
            return <li key={i}>{item.name}</li>
        })





        return (
            <div>
                <div>
                    <label>Outcome: </label>
                    <span>{matchData.outcome ? 'Victory' : 'Defeat'}</span>
                </div>

                <div>
                    <label>Game Duration: </label>
                    <span>{matchData.gameDuration}</span>
                </div>

                <div>
                    <label>Summoner Spells: </label>
                    <ol>{spells}</ol>
                </div>

                <div>
                    <label>Summoner Runes: </label>
                    <ol>{runes}</ol>
                </div>

                <div>
                    <label>K/DA: </label>
                    <span>{matchData.kda}</span>
                </div>

                <div>
                    <label>Items Purchased: </label>
                    <ol>{itemsPurchased}</ol>
                </div>

                <div>
                    <label>Champion Name: </label>
                    <span>{matchData.championName}</span>
                </div>

                <div>
                    <label>Champion Level: </label>
                    <span>{matchData.championLevel}</span>
                </div>

                <div>
                    <label>Total Creep Score: </label>
                    <span>{matchData.totalCreeps}</span>
                </div>

                <div>
                    <label>Creep Score / Minute: </label>
                    <span>{matchData.creepScorePerMinute}</span>
                </div>



                {/* summoner name


                champion name */}



            </div>
        )

    }


}

export default Stats;