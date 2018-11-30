import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Card,
    CardImg,

} from 'reactstrap';


class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    handleClick(e) {
        // alert('name',e.target)
        let shopId = e.target.id

        const headers = new Headers();
        headers.append('authorization', sessionStorage.getItem('jwToken'));
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'DELETE',
            headers,
        }

        fetch('/preferred/' + shopId, options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(response => {
                this.props.remove(shopId)
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { activeIndex } = this.state;

        // console.dir(this.props.items)
        const slides = this.props.items.map((item) => {
            return (
                <CarouselItem
                    className='image'
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.imgUrl}
                >
                    <Card>
                        <CardImg top
                            onClick={this.handleClick}
                            src={item.imgUrl}
                            alt="Card image cap"
                            id={item.key}
                        />
                    </Card>
                </CarouselItem>
            );
        });

        return (
            <div >
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>

        );
    }
}


export default Slide;