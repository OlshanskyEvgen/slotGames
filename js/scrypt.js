balanceAnimation();
let btn = document.querySelector('#btn');
let balance = 5000;
let bet;
btn.addEventListener('click', () => {
  const emojiValue = ["🥝", "🍋", "🍐", "🍓", "🍊",
                    "🍒", "🍈", "🍇", "🍉", "🍏",
                    "🍎", "🍍"];
  const slotNumber = ["#first", "#second", "#third"];
  const btn = document.querySelector('#btn');
  bet = parseInt(document.getElementById("bet").value);
  btn.style.transform = "scaleY(0.5)";
  let res = [];
    if(!checkBet(bet) || !checkBalance(balance, bet) ){
        btn.style.transform = "scaleY(1)";
        return;
    }
  for (let i = 0; i < 3; i++) {
    const slot = document.querySelector(slotNumber[i]);
    let j = 0;

    const animation = setInterval(() => {
      let slotEmoji = emojiValue[Math.floor(Math.random() * emojiValue.length)];
      slot.innerText = slotEmoji;
      j++;

      if (j >= 10) {
        clearInterval(animation);
        res[i] = emojiValue[Math.floor(Math.random() * emojiValue.length)];
        slot.innerText = res[i];
      }
    }, 100);
  }
  setTimeout(() => {
    btn.style.transform = "scaleY(1)";

    if (res[0] === res[1] && res[1] === res[2]) {
        balance += bet;
        balanceAnimationPlus(bet,balance);
      winAnim();
    } else {
        loseAnim();
        balanceAnimationMinus(bet,balance);
        balance -= bet;
        
    }
  }, 1100); 
});
function balanceAnimation(){

    let userBalance = 5000;
        const time = 1000;
        const step = 10;
        let startBalance = 0;
        let countStep = Math.round(time/(userBalance/step));
        let animation = setInterval (()=>{
            startBalance += step;
            if (startBalance === userBalance){
                clearInterval(animation);
            }
            document.getElementById("balance").innerText = startBalance;
        }, countStep)
}
function winAnim(){
let win = document.querySelector('#res');
win.style.backgroundColor = "rgb(21, 255, 0)";
win.innerText = "Ви перемогли";
setTimeout(()=>{
    win.innerText = "";
win.style.backgroundColor = "rgba(0, 0, 0, 0)";
},1500)
        
 }
 function loseAnim(){
let lose = document.querySelector('#res');
lose.style.backgroundColor = "rgba(255, 0, 0, 1)";
lose.style.color = "rgb(0,0,0)"
lose.innerText = "Ви програли";
setTimeout(()=>{
    lose.innerText = "";
lose.style.backgroundColor = "rgba(0, 0, 0, 0)";
},1500)
        
 }

 function checkBet(bet){
  if( isNaN(bet)){
        alert("нема ставки нема гри");
        return false;
    }else if ( bet <= 0){
        alert("В кредит не граємо");
        return false;
    }else{
    return true;}
}
function checkBalance(balance, bet){
 if(balance === 0 || balance < bet){
        alert("Не вистачає грошей");
        return false;
    }else{
        return true;
    }
    

}
function balanceAnimationPlus(bet,balance){
     const time = 100;
     
     let countStep = Math.max(10, Math.round(time / (bet / 5)));
     const stop = balance + bet;
     let animation = setInterval (()=>{
        balance += 1;
         if(balance ===  stop){
            clearInterval (animation);
     }
        document.getElementById('balance').innerHTML = balance;
     }, countStep);
}
function balanceAnimationMinus(bet,balance){
     const time = 100;
     let countStep = Math.max(10, Math.round(time / (bet / 5)));
   
     const stop = balance - bet;
     let animation = setInterval (()=>{
        balance -= 1;
         if(balance === stop){
            clearInterval (animation);
     }
        document.getElementById('balance').innerHTML = balance;
     }, countStep);
}