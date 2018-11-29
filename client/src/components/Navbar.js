import React from 'react';
import { BreadcrumbItem, Breadcrumb, Button } from 'reactstrap';
import NearbyShops from './NearbyShops'
import PreferedShops from './PreferedShops'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            preferred: false
        };
    }


    handleClick() {
        this.setState({ preferred: !this.state.preferred });
    }

    render() {
        let preferred = this.state.preferred;
        let active = preferred ? 'Preferred Shops' : 'Nearby Shops';
        let disactive = !preferred ? 'Preferred Shops' : 'Nearby Shops';
        let content = preferred ? <PreferedShops /> : <NearbyShops />;

        return <div id='nav'>

            <Breadcrumb className='Breadcrumb'>
                <BreadcrumbItem active>{active}</BreadcrumbItem>
                <BreadcrumbItem>
                    <Button outline color="secondary" onClick={this.handleClick}>{disactive}
                    </Button>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Button onClick={this.props.disconnection} outline color="warning">Logout
                            </Button>
                </BreadcrumbItem>

            </Breadcrumb>
            <div>{content}</div>
        </div>
    }
}
