
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};
const STORED_NUMBER_VALS = [];
const STORED_OPERATORS = []
const setCalcResult = (answer)=>{
    let calcScreen = document.querySelector('.calc-display');
    let answerNode = document.createElement('h3');
    answerNode.setAttribute('style','display:inline-block;')
    answerNode.textContent=answer;
    calcScreen.appendChild(answerNode);

}
const clearHandler = ()=>{
    let calcScreen = document.querySelector('.calc-display');
    let digitNodes = document.querySelectorAll('h3');
    digitNodes.forEach((digitNode)=>{
        calcScreen.removeChild(digitNode);
    });
}
const DispDigitHandler=(element)=>{
    
    let calcScreen = document.querySelector('.calc-display');
    let digitNode = document.createElement('h3');
    digitNode.setAttribute('style','display:inline-block;')
    digitNode.textContent=element.textContent;
    calcScreen.appendChild(digitNode);
}
const resultHandler = ()=>{
    let symbols =[];
    let strNum = '';
    let symbolNodes = document.querySelectorAll('h3');
    /** first part : append all elements to array */
    for(let i = 0;i<symbolNodes.length;i++){/*concat all the digits before an operator to form a number*/ 
        let symbolContent = symbolNodes[i].textContent.trim();/* push everything in an array */
        
        if(symbolContent=='+'||symbolContent=='-'||symbolContent=='*'||symbolContent=='/'){
            symbols.push(parseInt(strNum));
            
            strNum='';
            symbols.push(symbolContent);
            

        }
        else{
            strNum+=symbolContent;
            
        }


    }
    
    symbols.push(parseInt(strNum));/*store last element*/
    console.log(symbols);
    /** first part : append all elements to array */
    /**second part */
    for(let k = 0;k<symbols.length;k++){
        if(k==0){
            prevVal=symbols[k];
            
            
            
        }
        else{
            if(symbols[k]=='+'||symbols[k]=='-'||symbols[k]=='*'||symbols[k]=='/'){
                prevVal=operate(prevVal,symbols[k+1],symbols[k]);
                console.log(prevVal);

            }
    }
}
 
    /**second part */
    
    clearHandler();/* clear old memory */
    setCalcResult(prevVal);

    

}
let digits=document.querySelectorAll('.digit');
let operators=document.querySelectorAll('.operator');
let equals = document.querySelector('.equals');
let clear = document.querySelector('.clear');
clear.addEventListener('click',clearHandler);
equals.addEventListener('click',resultHandler);
digits.forEach((digit)=>{
    
    digit.addEventListener('click',()=>{DispDigitHandler(digit)});
});
operators.forEach((operator)=>{
    
    operator.addEventListener('click',()=>{DispDigitHandler(operator)});
});
function add(num1,num2){return num1+num2;}
function subtract(num1,num2){return num1-num2;}
function multiply(num1,num2){return num1*num2;}
function divide(num1,num2){return num1/num2;}
function operate(num1,num2,op){
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