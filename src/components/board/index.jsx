import * as React from 'react';
import './style.scss';
import Square from '../square';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.handleStartGame = this.handleStartGame.bind(this);
        this.calcNextTurn = this.calcNextTurn.bind(this);
        this.renderSquares = this.renderSquares.bind(this);

        this.state = {
            squares: Array(9).fill(null),
            turn: 'X',
            scoreX: 0,
            scoreO: 0
        }
    }

    render() {
        const { turn, scoreX, scoreO } = this.state;
        const winner = this.calcWinner();
        let winnerTitle = '';
        const player = this.calcNextTurn();
        if (winner) {
            if (winner === 'draw') {
                winnerTitle = `It's a draw!`;
            } else {
                winnerTitle = `Player ${player} is a winner!`;
            }

        }

        const currentTurn = winnerTitle === '' ? `current turn: ${turn}` : ''
        return <div className={'game'}>
            <h3>{currentTurn} {winnerTitle}</h3>
            <div className={'score-board'}>
                <div className={'player'}>"X"<br />{scoreX}</div>
                <div className={'score-label'}>score</div>
                <div className={'player'}>"O"<br />{scoreO}</div>
            </div>
            <div className={'board'}>
                {this.renderSquares()}
            </div>
            <button className={'btn'} onClick={this.handleStartGame}>Start Game</button>
        </div>
    }

    renderSquares() {
        const { squares } = this.state;
        const winner = this.calcWinner();

        return squares.map((square, index) => {
            const isWinner = winner && Array.isArray(winner) && winner.indexOf(index) > -1;
            return <Square winner={isWinner} key={index} value={square} onClick={() => this.handleClick(index)} />
        })
    }

    handleStartGame() {
        this.setState({
            squares: Array(9).fill(null),
            turn: 'X'
        })
    }

    handleClick(index) {
        const { turn } = this.state;
        const winner = this.calcWinner();
        const squares = [...this.state.squares];
        if (!squares[index] && !winner) {
            squares[index] = turn;
            this.setState({
                squares,
                turn: this.calcNextTurn()
            }, () => {
                const winner = this.calcWinner();
                if(winner && winner !== 'draw'){
                    this.setState(state => {
                        turn === 'X' ? state.scoreX++ : state.scoreO++;
                        return state;
                    })
                }
            })
        }
    }

    calcNextTurn() {
        const { turn } = this.state;
        return turn === 'X' ? 'O' : 'X'
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
                return combo[i];
            }
        }

        if (squares.every(x => x)) {
            return 'draw';
        }
        return null;

    }
}