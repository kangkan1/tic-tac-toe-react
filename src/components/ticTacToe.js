import { useState } from "react";
import Footer from "./footer";
function click(val){
    console.log(val)

}
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
        
        console.log(e.target.innerText)
        let temp = [...board];
        if(e.target.innerText.length == 0){
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
    return (
            <div className="center">
                <p>Player: {chance}'s turn</p>
                <table>
                    <tbody>
                        <tr>
                            <td onClick={(e)=>setMove(0, 0, e)}>{board[0][0]}</td>
                            <td onClick={(e)=>setMove(0, 1, e)}>{board[0][1]}</td>
                            <td onClick={(e)=>setMove(0, 2, e)}>{board[0][2]}</td>
                        </tr>
                        <tr>
                            <td onClick={(e)=>setMove(1,0, e)}>{board[1][0]}</td>
                            <td onClick={(e)=>setMove(1,1, e)}>{board[1][1]}</td>
                            <td onClick={(e)=>setMove(1,2, e)}>{board[1][2]}</td>
                        </tr>
                        <tr>
                            <td onClick={(e)=>setMove(2,0, e)}>{board[2][0]}</td>
                            <td onClick={(e)=>setMove(2,1, e)}>{board[2][1]}</td>
                            <td onClick={(e)=>setMove(2,2, e)}>{board[2][2]}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={refresh}>Refresh</button>
                <Footer />
            </div>
      );
}