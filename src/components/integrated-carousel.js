import React from 'react';
import ImageCarousel from './image-carousel/image-carousel';
import TextCarousel from './text-carousel/text-carousel';


const Carousel = ({ items, selectedItem, onItemSelect }) => {
    return (
        <div className="main-carousel-wrapper">
            <ImageCarousel
                onItemSelect={onItemSelect}
                selectedItem={selectedItem}
                items={items} />

            <TextCarousel
                onItemSelect={onItemSelect}
                selectedItem={selectedItem}
                items={items} />
        </div>
    );
}

export default Carousel;