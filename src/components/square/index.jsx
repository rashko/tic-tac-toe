import * as React from 'react';
import './style.scss';

export default class Square extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {value, onClick} = this.props;
        return <div className={'square'} onClick={onClick}>{value}</div>
    }

}