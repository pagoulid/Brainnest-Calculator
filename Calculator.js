
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};

const setCalcResult = (dispNode,answer)=>{
    dispNode.textContent=answer;
}
const clearHandler = ()=>{
    let symbolNode = document.querySelector('h3');
    symbolNode.textContent='';
}
const DisplayHandler=(element)=>{
    let symbolNode = document.querySelector('h3');
    symbolNode.textContent+=element.textContent.trim();
}
const resultHandler = ()=>{
    
    let strNum = '';
    let symbolStrNode = document.querySelector('h3');
    let symbols = symbolStrNode.textContent.split('');/*'12+25*34'->['1','2','+','2','5','*','3','4']*/ 
    
    let calcArray=generateSymbolArr(symbols);/* ['1','2','+','2','5','*','3','4'] -> [12,'+',25,'*',34]*/ 
    let calcResult = calculations(calcArray);/*calculations result(number)*/ 
    
    clearHandler();/* clear old memory */
    setCalcResult(symbolStrNode,calcResult);   

}
/* MAIN */
let digits=document.querySelectorAll('.digit');
let operators=document.querySelectorAll('.operator');
let equals = document.querySelector('.equals');
let clear = document.querySelector('.clear');

clear.addEventListener('click',clearHandler);
equals.addEventListener('click',resultHandler);

digits.forEach((digit)=>{
    
    digit.addEventListener('click',()=>{DisplayHandler(digit)});
});
operators.forEach((operator)=>{
    
    operator.addEventListener('click',()=>{DisplayHandler(operator)});
});
/* MAIN */

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

function generateSymbolArr(array){
    let strNum = '';
    let newArr = [];
    for(let i=0;i<array.length;i++){

        if(array[i]=='+'||array[i]=='-'||array[i]=='*'||array[i]=='/'){
            newArr.push(parseInt(strNum));
            strNum='';
            newArr.push(array[i]);
        }
        else{
            strNum+=array[i];    
        } 
    }
    newArr.push(parseInt(strNum));
    return newArr;


}
function calculations(symbolArr){ /*Take arr of nums and ops -> return calc result*/ 
    let prevVal=symbolArr[0];
    for(let k=0;k<symbolArr.length;k++){
        if(symbolArr[k]=='+'||symbolArr[k]=='-'||symbolArr[k]=='*'||symbolArr[k]=='/'){
            prevVal=operate(prevVal,symbolArr[k+1],symbolArr[k]);
        }
    }
    return prevVal;

}