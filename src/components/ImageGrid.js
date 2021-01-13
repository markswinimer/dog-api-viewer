import React from 'react';
import './ImageGrid.css';

// Image Tile component
const ImageCard = (props) => {
    return(
        <div className="dog-image-card">
            <img src={props.url} id={props.id} alt={props.selectedBreed} />
        </div>
    )
}

// Breeds List Component
class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loadedImages: [],
            incrementAmount: 9
        }
        this.fetchDogImages = this.fetchDogImages.bind(this);
        this.loadMoreImages = this.loadMoreImages.bind(this);
        this.isInViewport = this.isInViewport.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    
    componentDidMount() {
        this.fetchDogImages() 
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps) {
        // Did the selected breed update?
        if(this.props.selectedBreedId !== prevProps.selectedBreedId) {
            this.fetchDogImages();
        }
    }
    
    scrollToTop() {
        let scrollToPoint = document.getElementById("root");
        scrollToPoint.scrollIntoView({behavior: "smooth"}); 
    }

    // listener checking if we need to load more images
    handleScroll() {
        if(this.state.images.length > 1) {
            const element = document.getElementById("load-trigger")
            if(this.isInViewport(element)) {
                this.loadMoreImages(this.state.incrementAmount)
            }
        }
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    async fetchDogImages() {
        let { selectedBreedId } = this.props;
        // formats selectedBreedId for api call
        selectedBreedId = selectedBreedId.replace("-", "/");
        
        // call to API which returns breed image urls of the selected breed
        await fetch(`https://dog.ceo/api/breed/${selectedBreedId}/images`)
        .then(response => response.json())
        .then(data => this.setState({ 
            images: data.message, 
            loadedImages: []
        }))
        .catch((error) => {
            console.log(error)
        })

        // Load the first 9 images
        this.loadMoreImages();
    }

    // Loads more images based on the incrementAmount, updating state to reflect
    loadMoreImages() {
        if (!this.state.error) {
            let { images, loadedImages, incrementAmount } = this.state;

            if(images.length > incrementAmount) {
                let splicedItems = images.splice(1, incrementAmount);
                loadedImages = loadedImages.concat(splicedItems);
            } else {
                loadedImages = loadedImages.concat(images)
                images = [];
            }
            this.setState({ images, loadedImages })
        }
    }

    render() {
        let images;

        // populates page with ImageCard components for all the url's in loadedImages state
        if(this.state.loadedImages.length > 0) {
            images = this.state.loadedImages.map(url => (        
                <ImageCard key={url} url={url} selectedBreed={this.props.selectedBreed} />
            ))
        };

        return(
            <div className="image-grid-component">
                <h1>the <em>{this.props.selectedBreedName}</em>.</h1>
                <div className="dog-image-grid">
                    {images}
                    <div id="load-trigger"></div>
                </div>
                <div onClick={this.scrollToTop} className="return-to-top">
                   <h2>Back to top.</h2>
                </div>
            </div>
        )
    }
};

export default ImageGrid;