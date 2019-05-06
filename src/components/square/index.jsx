import * as React from 'react';
import classNames from 'classnames';
import './style.scss';

export default class Square extends React.PureComponent {
    
    render() {
        const {value, onClick, winner} = this.props;
        const squareClass = classNames('square', {'winner': winner})
        return <div className={squareClass} onClick={onClick}>{value}</div>
    }

}