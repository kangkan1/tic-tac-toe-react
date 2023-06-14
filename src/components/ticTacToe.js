import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import RefreshIcon from "./refresh_icon";
import '../App.css';

export default function TicTatcToe(){
    const [chance, setChance] = useState('X');
    const [playWithComp, setPlayWithComp] = useState(false);
    const [board, setBoard] = useState([['','',''], ['','',''], ['','','']]);

    function checkWinner(board_temp){
        for(let i=0;i<3;i++){
            if(board_temp[i][0] === 'X' || board_temp[i][0] === 'O'){
                if(board_temp[i][0] === board_temp[i][1] &&  board_temp[i][1]=== board_temp[i][2]){
                    return board_temp[i][0]
                    
                }
            }
            if(board_temp[0][i] === 'X' || board_temp[0][i] === 'O'){
                if(board_temp[0][i] === board_temp[1][i] &&  board_temp[1][i]=== board_temp[2][i]){
                    return board_temp[0][i];
                    
                }
            } 
        }
        if(board_temp[0][0] === 'X' || board_temp[0][0] === 'O'){
            if(board_temp[0][0] === board_temp[1][1] &&  board_temp[1][1]=== board_temp[2][2]){
                return board_temp[0][0];
            }
        }
        if(board_temp[2][0] === 'X' || board_temp[2][0] === 'O'){
            if(board_temp[2][0] === board_temp[1][1] &&  board_temp[1][1] === board_temp[0][2]){
                return board_temp[2][0];
                
            }
        }
        
        return null;
    }

    function isMovesLeft(board_temp){
        for(let i = 0; i < 3; i++)
            for(let j = 0; j < 3; j++)
                if (board_temp[i][j] === '')
                    return true;         
        return false;
    }

    function evaluate(b){
      
    // Checking for Rows for X or O victory.
        for(let row = 0; row < 3; row++)
        {
            if (b[row][0] === b[row][1] &&
                b[row][1] === b[row][2])
            {
                if (b[row][0] === 'O')
                    return +10;
                    
                else if (b[row][0] === 'X')
                    return -10;
            }
        }
        for(let col = 0; col < 3; col++)
        {
            if (b[0][col] === b[1][col] &&
                b[1][col] === b[2][col])
            {
                if (b[0][col] === 'O')
                    return +10;
    
                else if (b[0][col] === 'X')
                    return -10;
            }
        }
        if (b[0][0] === b[1][1] && b[1][1] === b[2][2]){
            if (b[0][0] === 'O')
                return +10;  
            else if (b[0][0] === 'X')
                return -10;
        }
        if (b[0][2] === b[1][1] && b[1][1] === b[2][0]){
            if (b[0][2] === 'O')
                return +10;         
            else if (b[0][2] === 'X')
                return -10;
        }
        return 0;
    }

    function minimax(board_temp, depth, isMax){
        let score = evaluate(board_temp);
        if (score === 10)
            return score;
        if (score === -10)
            return score;
        if (isMovesLeft(board_temp) === false)
            return 0;
        if (isMax){
            let best = -1000;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if (board_temp[i][j]===''){
                        board_temp[i][j] = 'O';
                        best = Math.max(best, minimax(board_temp,
                                        depth + 1, !isMax));     
                        board_temp[i][j] = '';
                    }
                }
            }
            return best;
        }
        else{
            let best = 1000;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if (board_temp[i][j] === ''){
                        board_temp[i][j] = 'X';
                        best = Math.min(best, minimax(board_temp,
                                        depth + 1, !isMax));
                        board_temp[i][j] = '';
                    }
                }
            }
        return best;
        }
    }
    function setMove(i, j, e){
        
        let temp = [...board];
        console.log(board)
        if(e.target.innerText.length === 0){
            if(chance === 'X'){
                temp[i][j] = 'X';
                setBoard(temp);
                if(!playWithComp){
                    setChance('O');
                }
            
                if(playWithComp && chance==='X'){
                    let bestScore = -1000;
                    let bestMove;
                    for(let k=0;k<3;k++){
                        for(let l=0;l<3;l++){
                            if(temp[k][l] === ''){
                                temp[k][l] = 'O';
                                let score = minimax(temp, 0, false);
                                temp[k][l] = '';
                                if(score > bestScore){
                                    bestScore = score;
                                    bestMove = [k, l] ;  
                                }
                            }
                        }
                    }
                    if(bestMove){
                        temp[bestMove[0]][bestMove[1]] = 'O';
                        setBoard(temp);
                        setChance('X');
                    }
                    

                }
            }else if(!playWithComp && chance === 'O'){
                temp[i][j] = 'O';
                setBoard(temp);
                setChance('X');
            }
            let winner = checkWinner(temp);
            if(winner === 'X'){
                alert('Player:'+winner+" is the winner")
                refresh()
            }else if(winner === 'O'){
                alert('Player:'+winner+" is the winner")
                refresh()
            }
            
        }else{
            alert('Invalid move')
        }
        if(!isMovesLeft(board)){
            alert("It's a tie")
        }
        //console.log(board)
    }
    function refresh(){
        let temp = [...board];
        
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                temp[i][j] = '';
            }
        }
        //console.log(temp)
        setBoard(temp);
        setChance('X');
        //console.log(board);
    }
    return (
            <div >
                <Header />
                <div className="center">
                    <div className='row'>
                        <span>
                            Play with Computer?
                        </span>
                        <label class="switch">
                            <input type="checkbox" onChange={()=>{setPlayWithComp(!playWithComp); refresh();}}/>
                            <span class="slider round"></span>
                        </label>
                    </div>
                    
                    <p>Player: {chance}'s turn</p>
                    <table>
                        <tbody>
                            <tr>
                                <td onClick={(e)=>setMove(0, 0, e)} className="border-right border-buttom" style={{color:(board[0][0]==='X'?'yellow':'red')}}>{board[0][0]}</td>
                                <td onClick={(e)=>setMove(0, 1, e)} className="border-right border-left border-buttom" style={{color:(board[0][1]==='X'?'yellow':'red')}}>{board[0][1]}</td>
                                <td onClick={(e)=>setMove(0, 2, e)} className="border-left border-buttom" style={{color:(board[0][2]==='X'?'yellow':'red')}}>{board[0][2]}</td>
                            </tr>
                            <tr>
                                <td onClick={(e)=>setMove(1,0, e)} className="border-right border-buttom border-top" style={{color:(board[1][0]==='X'?'yellow':'red')}}>{board[1][0]}</td>
                                <td onClick={(e)=>setMove(1,1, e)} className="border-right border-left border-buttom border-top" style={{color:(board[1][1]==='X'?'yellow':'red')}}>{board[1][1]}</td>
                                <td onClick={(e)=>setMove(1,2, e)} className="border-left border-buttom border-top" style={{color:(board[1][2]==='X'?'yellow':'red')}}>{board[1][2]}</td>
                            </tr>
                            <tr>
                                <td onClick={(e)=>setMove(2,0, e)} className="border-right border-top" style={{color:(board[2][0]==='X'?'yellow':'red')}}>{board[2][0]}</td>
                                <td onClick={(e)=>setMove(2,1, e)} className="border-right border-left border-top" style={{color:(board[2][1]==='X'?'yellow':'red')}}>{board[2][1]}</td>
                                <td onClick={(e)=>setMove(2,2, e)} className="border-left border-top" style={{color:(board[2][2]==='X'?'yellow':'red')}}>{board[2][2]}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={refresh}>
                        <RefreshIcon width={"18"}  height={"18"}/>
                    </button>
                </div>
                <Footer />
            </div>
      );
}