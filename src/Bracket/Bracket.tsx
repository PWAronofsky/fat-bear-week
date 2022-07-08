
import '../App.css';
import { mockBears } from '../mockData';
import { Bear } from '../Bear/Bear';

export const Bracket = () => {

  const pickWinner = (bearId: number) => {
    console.log(`Picked id: ${bearId}`);
  }

  return (
    <div className="App">
      <Bear {...mockBears[0]} pickThisBear={pickWinner}/>
      <Bear {...mockBears[1]} pickThisBear={pickWinner}/>
    </div>
  );
}