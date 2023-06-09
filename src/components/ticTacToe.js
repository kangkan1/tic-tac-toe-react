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

    function minimax(board_temp, depth, isMaximising){
        let result = checkWinner(board_temp);
        if(result === 'O'){
            return 1;
        }else if(result === 'X'){
            return -1;
        }else{
            return 0;
        }
        if(isMaximising){
            let bestScore = -Infinity;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(board_temp[i][j] === ''){
                        let score = minimax
                    }
                }
            }
        }else{

        }
        return 1;
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
                    let bestScore = -Infinity;
                    let bestMove;
                    for(let i=0;i<3;i++){
                        for(let j=0;j<3;j++){
                            if(temp[i][j] === ''){
                                temp[i][j] = 'O';
                                let score = minimax(temp, 0, true)
                                temp[i][j] = '';
                                if(score > bestScore){
                                    bestScore = score;
                                    bestMove = [i, j] ;  
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
                    <div class='row'>
                        <span>
                            Play with Computer?
                        </span>
                        <label class="switch">
                            <input type="checkbox" onChange={()=>{setPlayWithComp(!playWithComp)}}/>
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