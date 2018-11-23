import React from 'react';

const Dropdown = (props) => {
    let matches = null;
    
    if (props.matches) {
        matches = props.matches.map(match => {
            return <option key={match.gameId} value={match.gameId}>{match.gameId}</option>
        })

        return (
            <select onChange={(event) => props.changed(event)}>
                <option>Select a Game ID</option>
                {matches}
            </select>
        )
    }

    return null;




}

export default Dropdown;