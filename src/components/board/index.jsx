import * as React from 'react';
import './style.scss';
import Square from '../square';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.handleStartGame = this.handleStartGame.bind(this);
        this.state = {
            squares: Array(9).fill(null),
            turn: 'X'
        }
    }

    render() {
        const { squares, turn } = this.state;
        const winner = this.calcWinner();
        let winnerTitle = '';
        const player = turn === 'X' ? 'V' : 'X';
        if (winner) {
            if(winner === 'draw'){
                winnerTitle = `It's a draw!`;
            } else {
                winnerTitle = `Player ${player} is a winner!`;
            }
            
        }
        return <>
            <h3>{winnerTitle}</h3>
            <div className={'board'}>
                {squares.map((square, index) => {
                    return <Square value={square} onClick={() => this.handleClick(index)} />
                })}
            </div>
            <button onClick={this.handleStartGame}>Start Game</button>
        </>
    }

    handleStartGame() {
        this.setState({
            squares: Array(9).fill(null),
            turn: 'X'
        })
    }

    handleClick(index) {
        const { turn } = this.state;
        const squares = [...this.state.squares];
        if (!squares[index]) {
            squares[index] = turn;
            this.setState({
                squares,
                turn: turn === 'X' ? 'V' : 'X'
            })
        }
    }

    calcWinner() {
        const { squares } = this.state;
        const combo = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < combo.length; i++) {
            const [a, b, c] = combo[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        if(squares.every(x => x)){
            return 'draw';
        }
        return null;

    }
}