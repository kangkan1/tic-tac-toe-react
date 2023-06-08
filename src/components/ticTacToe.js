import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import RefreshIcon from "./refresh_icon";
import '../App.css';

export default function TicTatcToe(){
    const [chance, setChance] = useState('X')
    const [board, setBoard] = useState([['','',''], ['','',''], ['','','']])

    function checkWinner(){
        for(let i=0;i<3;i++){
            if(board[i][0] === 'X' || board[i][0] === 'O'){
                if(board[i][0] === board[i][1] &&  board[i][1]=== board[i][2]){
                    alert('Player:'+board[i][0]+" is the winner")
                    refresh()
                }
            }
            if(board[0][i] === 'X' || board[0][i] === 'O'){
                if(board[0][i] === board[1][i] &&  board[1][i]=== board[2][i]){
                    alert('Player:'+board[0][i]+" is the winner")
                    refresh()
                }
            } 
        }
        if(board[0][0] === 'X' || board[0][0] === 'O'){
            if(board[0][0] === board[1][1] &&  board[1][1]=== board[2][2]){
                alert('Player:'+board[0][0]+" is the winner")
                refresh()
            }
        }
        if(board[2][0] === 'X' || board[2][0] === 'O'){
            if(board[2][0] === board[1][1] &&  board[1][1]=== board[0][2]){
                alert('Player:'+board[2][0]+" is the winner")
                refresh()
            }
        }
    }
    function setMove(i, j, e){
        
        let temp = [...board];
        if(e.target.innerText.length === 0){
            if(chance === 'X'){
                temp[i][j] = 'X';
                setBoard(temp);
                setChance('O');
            }else if(chance === 'O'){
                temp[i][j] = 'O';
                setBoard(temp);
                setChance('X');
            }
            checkWinner()
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

    function flipCard(e){
        e.classList.toggle('flipCard')
    }
    return (
            <div >
                <Header />
                <div className="center">
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
                <div className="maincontainer">
                    <div className="card" onClick={(e)=>flipCard(e)}>
                        <div className="front">
                            <h3>My Font Text</h3>
                        </div>
                        <div className="back">
                            <h3>My Back Text</h3>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
      );
}