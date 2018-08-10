import React from 'react';

const ImageCarouselItem = ({ selectedItem }) => {
    const imageUrl = require(`../../media/movies-images/${selectedItem.id}.jpg`);

    return (
        <div className={`slide-item ${selectedItem.isVisible}`}>
            <div className="image-desc-wrapper">
                <div className="image-desc">
                    <h2>
                        {selectedItem.name}
                        <span className="divider"></span>
                    </h2>
                    <h3>{selectedItem.info}</h3>
                </div>
            </div>
            <div className="image-item">
                <img src={imageUrl} alt={selectedItem.name} />
            </div>
        </div>
    );
}

export default ImageCarouselItem;