import React, { Component } from 'react';
import ImageCarouselItem from './image-carousel-item';
import './style.css';

class ImageCarousel extends Component {

    componentDidMount() {
        // slide carousel every 10 seconds
        setInterval(this.onNextItemSelect, 10000);
    }

    render() {
        /**
         * generate slide items
         */
        const slideItems = this.props.items.map((item, index) => {
            return <ImageCarouselItem
                key={item.id}
                selectedItem={item} />;
        });

        return (
            <div className="image-carousel-wrapper">
                <div className="image-carousel">
                    {slideItems}
                </div>
                <div className="button-prev" onClick={this.onPrevItemSelect}></div>
                <div className="button-next" onClick={this.onNextItemSelect}></div>
            </div>
        )
    }

    /**
     * previous Item select
     */
    onPrevItemSelect = () => {
        const lastItemIndex = this.props.items.length - 1;
        const currentItemIndex = this.props.items.findIndex(i => i.id === this.props.selectedItem.id);
        const prevItem = currentItemIndex - 1 < 0 ? this.props.items[lastItemIndex] : this.props.items[currentItemIndex - 1];

        this.props.onItemSelect(prevItem, 'right');
    }

    /**
     * next item select
     */
    onNextItemSelect = () => {
        const lastItemIndex = this.props.items.length - 1;
        const currentItemIndex = this.props.items.findIndex(i => i.id === this.props.selectedItem.id);
        const nextItem = currentItemIndex + 1 > lastItemIndex ? this.props.items[0] : this.props.items[currentItemIndex + 1];

        this.props.onItemSelect(nextItem, 'left');
    }
}

export default ImageCarousel;