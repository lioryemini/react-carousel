import React from 'react';
import './style.css';

const TextCarousel = ({ selectedItem, items, onItemSelect }) => {

    /**
     * carousel text item
     */
    const itemName = items.map((item, index) => {
        item.isActive = item.id === selectedItem.id ? 'active-text' : '';
        let direction = '';

        if (item.order < 3) {
            direction = 'right';
        } else if (item.order > 3) {
            direction = 'left';
        }

        return (
            <li className={`text-slide-item-wrapper ${item.isActive}`}
                key={item.id}
                onClick={() => onItemSelect(item, direction)}
                style={{ order: item.order }}>
                <div className="text-slide-item" key={item.id}>
                    <div className="title">{item.name}</div>
                </div>
            </li>
        )
    })

    return (
        <div className="text-carousel-wrapper" >
            <ul className="text-carousel">
                {itemName}
            </ul>
        </div>
    );
}

export default TextCarousel;