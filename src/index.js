import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/integrated-carousel';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            items: [],
            selectedItem: null
        };
    }

    componentDidMount() {
        this.getMoviesFromApi()
            .then(res => {
                this.parseItems(res);
            })
            .catch(err => console.log(err));
    }

    /**
     * render view
     */
    render() {
        return (
            <div>
                <Carousel
                    items={this.state.items}
                    selectedItem={this.state.selectedItem}
                    onItemSelect={this.onItemSelect} />
            </div>
        )
    }

    /**
    * get items from server
    */
    getMoviesFromApi = async () => {
        const response = await fetch('http://localhost:3005/movies');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    /**
    * parse items order and add them to state
    * @param {Array} res - response items
    */
    parseItems(res) {
        res.map((item, index) => {
            item.isVisible = index === 2 ? 'active' : '';
            item.isVisible = index === 3 ? 'last-slide' : '';
            item.order = index + 1;
        });

        this.setState({
            items: res,
            selectedItem: res[3]
        })
    }

    /**
     * on movie select logic
     */
    onItemSelect = (selectedItem, direction) => {
        let current;
        let next;
        
        this.state.items.map((item, index) => {
            if (selectedItem.id === item.id) {
                current = index;
            }
            item.isVisible = '';
        });

        if (direction === 'right') {
            next = current - 1 < 0 ? this.state.items.length - 1 : current - 1;
            this.state.items[next].isVisible = 'last-slide-reverse';
            this.state.items[current].isVisible = 'active-reverse';
        } else {
            next = current === this.state.items.length ? 0 : current;
            this.state.items[next].isVisible = 'last-slide';
            const currentIndex = current === 0 ? this.state.items.length - 1 : current - 1;
            this.state.items[currentIndex].isVisible = 'active';
        }

        if (selectedItem.order === 1 || selectedItem.order === 5) {
            this.changeOrder(direction, 2);
        } else {
            this.changeOrder(direction, 1);
        }

        this.setState({ selectedItem })
    }

    /**
     * change order of items array
     * @param {String} direction - forward/reverse order id's
     * @param {Number} increment - number of times for increment
     */
    changeOrder(direction, increment) {
        let i = 0;
        while (i < increment) {
            for (let index = 0; index < this.state.items.length; index++) {
                const element = this.state.items[index];

                if (direction === 'right') {
                    element.order = element.order < this.state.items.length ? element.order + 1 : 1;
                }
                if (direction === 'left') {
                    element.order = element.order === 1 ? this.state.items.length : element.order - 1;
                }
            }
            i++;
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
