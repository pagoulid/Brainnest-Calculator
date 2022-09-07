
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};

const clearHandler = ()=>{
    let symbolNode = document.querySelector('h3');
    symbolNode.textContent='';
}
const DisplayDigitHandler=(digitNode)=>{
    let symbolNode = document.querySelector('h3');
    symbolNode.textContent+=digitNode.textContent.trim();
}
const DisplayOpHandler=(operatorNode)=>{
    let symbolNode = document.querySelector('h3');
    let symbolContent = symbolNode.textContent;
 
    
    if(symbolContent.length==0 && operatorNode.textContent.trim()=='-'){/*Check if first symbol is - for negative number*/ 
        symbolNode.textContent+=operatorNode.textContent.trim();/**to appear to DOM!! */
        
    }
    else{
        /*Checks current h3 string when an op is pressed */
        /* If another op already exists , means we have already an equation */
        /* Calc the result of the eq above and put to DOM the result with the current operator that was pressed  */
        if(symbolContent.includes('+')||symbolContent.includes('-',1)||symbolContent.includes('*')||symbolContent.includes('/')){
            let calcArr = generateSymbolArr(symbolContent.split(''));/* ['1','2','+','2','5'] -> [12,'+',25]*/
            let subResult = calculations(calcArr);/*calculations result(number)*/
            symbolNode.textContent=subResult+operatorNode.textContent.trim();/**to appear to DOM!! */
        }
        else{
            
            symbolNode.textContent+=operatorNode.textContent.trim();/**to appear to DOM!! */
            
        }
    }
    
}
const resultHandler = ()=>{
    
    let strNum = '';
    let symbolNode = document.querySelector('h3');
    let symbols = symbolNode.textContent.split('');/*'12+25'->['1','2','+','2','5']*/ 
    
    let calcArray=generateSymbolArr(symbols);/* ['1','2','+','2','5'] -> [12,'+',25]*/ 
    let calcResult = calculations(calcArray);/*calculations result(number)*/ 
    symbolNode.textContent=calcResult;
   
}
/* MAIN */
let digits=document.querySelectorAll('.digit');
let operators=document.querySelectorAll('.operator');
let equals = document.querySelector('.equals');
let clear = document.querySelector('.clear');

clear.addEventListener('click',clearHandler);
equals.addEventListener('click',resultHandler);

digits.forEach((digit)=>{
    
    digit.addEventListener('click',()=>{DisplayDigitHandler(digit)});
});
operators.forEach((operator)=>{
    
    operator.addEventListener('click',()=>{DisplayOpHandler(operator)});
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
//&&(i!=0)
function generateSymbolArr(array){
    let strNum = '';
    let newArr = [];
    for(let i=0;i<array.length;i++){

        if(array[i]=='+'||(array[i]=='-'&&(i!=0))||array[i]=='*'||array[i]=='/'){
            newArr.push(parseInt(strNum));
            strNum='';
            newArr.push(array[i]);
        }
        else{
            strNum+=array[i];
               
        } 
    }
    newArr.push(parseInt(strNum));
    console.log(`str:${newArr}`); 
    return newArr;


}
function calculations(symbolArr){ /*Take arr of nums and ops -> return calc result*/ 
        let prevVal=operate(symbolArr[0],symbolArr[2],symbolArr[1]); 
        return prevVal; 
    
    
}