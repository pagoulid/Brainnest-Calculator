
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};
const clearHandler = ()=>{
    let calcScreen = document.querySelector('.calc-display');
    let digitNodes = document.querySelectorAll('h3');
    digitNodes.forEach((digitNode)=>{
        calcScreen.removeChild(digitNode);
    });
}
const DispDigitHandler=(element)=>{
    console.log(element.textContent);
    let calcScreen = document.querySelector('.calc-display');
    let digitNode = document.createElement('h3');
    digitNode.setAttribute('style','display:inline-block;')
    digitNode.textContent=element.textContent;
    calcScreen.appendChild(digitNode);
}
let digits=document.querySelectorAll('.digit');
let clear = document.querySelector('.clear');
clear.addEventListener('click',clearHandler)
digits.forEach((digit)=>{
    
    digit.addEventListener('click',()=>{DispDigitHandler(digit)})
});
function add(num1,num2){return num1+num2;}
function subtract(num1,num2){return num1-num2;}
function multiply(num1,num2){return num1*num2;}
function divide(num1,num2){return num1/num2;}
function operate(op,num1,num2){
    let opCondition = OPERATORS[op];
    let answer;
    switch(opCondition){
        case 0:
            answer=add(num1,num2);
            break;
        case 1:
            answer=subtract(num1,num2);
            break;
        case 2:
            answer=multiply(num1,num2);
            break;
        case 3:
            answer=divide(num1,num2);
            break;
    }
    return answer;

}