import { useState } from "react";

function click(val){
    console.log(val)

}
export default function TicTatcToe(){
    const [chance, setChance] = useState('X')
    function click(val){
        console.log(val)
        if(chance === 'X'){
            setChance('O')
        }else if(chance === 'O'){
            setChance('X')
        }
        console.log(chance)
    }
    return (
            <div className="center">
                <p>Player: {chance}'s turn</p>
                <table>
                <tr>
                    <td onClick={()=>click(0)}></td>
                    <td onClick={()=>click(1)}></td>
                    <td onClick={()=>click(2)}></td>
                </tr>
                <tr>
                    <td onClick={()=>click(3)}></td>
                    <td onClick={()=>click(4)}></td>
                    <td onClick={()=>click(5)}></td>
                </tr>
                <tr>
                    <td onClick={()=>click(6)}></td>
                    <td onClick={()=>click(7)}></td>
                    <td onClick={()=>click(8)}></td>
                </tr>
                </table>
            </div>
      );
}