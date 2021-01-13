import React from 'react';
import { List } from './List';
import ImageGrid from './ImageGrid';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: [],
            selectedBreedName: 'Border Collie',
            selectedBreedId: 'collie-border',
        }
        this.selectBreed = this.selectBreed.bind(this)
    }

    componentDidMount() {
        // Fetches a list of all dog breeds from the API
        fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => this.setState({ dogs: data.message }, function() {
            // hard code a default breed to load images of.
            this.selectBreed(["Border Collie", "collie-border"])
        }))
        .catch((error) => {
            console.log(error);
        })
    }

    // Handles click event for list items
    selectBreed(values) {
        const selectedBreedName = values[0];
        const selectedBreedId = values[1];

        // Updates the state with the selected dog and calls the function to fetch images from the API
        if(selectedBreedName !== this.state.selectedBreedName) {
            this.setState({ selectedBreedName, selectedBreedId }, function() {
                // scrolls to top of dog images on mobile
                if (window.innerWidth < 600) {
                    const scrollToPoint = document.getElementById("mobile-anchor");
                    scrollToPoint.scrollIntoView({behavior: "smooth"});
                }
            })
        }
    }

    render() {
        return(
            <div className="app">
                <div className="app-wrapper">
                    <nav>
                        <div className="title">
                            <h1>Dog API Viewer</h1>
                            <p>Serving up images of dogs. All day.</p>
                        </div>
                        <img className="logo" src="/icons/hotdog-solid.svg" alt="pawprint"/>
                    </nav>

                    <div className="app-container">
                        <div className="app-left-column">
                            <List handleClick={this.selectBreed} breeds={this.state.dogs}/>
                        </div>

                        <div id="mobile-anchor" className="app-right-column">
                            <ImageGrid 
                                selectedBreedName={this.state.selectedBreedName} 
                                selectedBreedId={this.state.selectedBreedId} 
                                dogImages={this.state.dogImages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;