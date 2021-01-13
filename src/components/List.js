import React from 'react';
import './List.css';

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Individual list-item component for Breeds List
const ListItem = (props) => {
    let values = [props.breedName, props.breedId];
    return(
        <li className="list-item" onClick={() => props.handleClick(values)} id={props.breedId}>{props.breedName}</li>
    )
}

export const List = (props) => {
    let breedsList;
    // Reads the breeds object and generates <li> components for each breed
    // runs capitalize function and formats breed names
    breedsList = Object.entries(props.breeds).map(([breedName, subBreeds]) => {
        if(subBreeds.length > 0) {
            // If breed has sub-breeds, iterate over those too
            return subBreeds.map(subBreedName => (
                <ListItem 
                    breedId={breedName + '-' + subBreedName}
                    key={subBreedName + breedName} 
                    handleClick={props.handleClick} 
                    breedName={capitalize(subBreedName) + ' ' + capitalize(breedName)}
                />
            ))
        } else {
            return( 
                <ListItem 
                    breedId={breedName} 
                    key={breedName} 
                    handleClick={props.handleClick} 
                    breedName={capitalize(breedName)} 
                />
            )
        }
    })

    return(
        <div className="list-component">
            <h2>All Breeds</h2>
            <div className="list-container">
                <img className="arrow-icon" src="/icons/chevron-up-solid.svg" alt="up arrow"/>
                <ul className="list">
                    {breedsList}
                </ul>
                <img className="arrow-icon" src="/icons/chevron-down-solid.svg" alt="up arrow"/>
            </div>
        </div>
    )
};
