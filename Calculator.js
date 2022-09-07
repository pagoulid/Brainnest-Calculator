
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};

const clearHandler = ()=>{
    let symbolNode = document.querySelector('h3');
    symbolNode.textContent='';
}
/*error cases: +-,(+-* div at start)*/ 
const DisplayDigitHandler=(digitNode)=>{
    let symbolNode = document.querySelector('h3');
    if(symbolNode.textContent!='Err'){
        symbolNode.textContent+=digitNode.textContent.trim();
    }
    
}
const DisplayOpHandler=(operatorNode)=>{
    let symbolNode = document.querySelector('h3');
    let symbolContent = symbolNode.textContent;
    let symbolArr=symbolContent.split('');
    let opAtStart = symbolContent.length===0 && operatorNode.textContent.trim()!='-';
    let opAtEnd = symbolArr[symbolArr.length-1]=='+'||symbolArr[symbolArr.length-1]=='-'||symbolArr[symbolArr.length-1]=='*'||symbolArr[symbolArr.length-1]=='/';
    //let opAtEnd = symbolContent.split('')
 
    if(symbolContent!='Err'&&(!opAtStart)&&(!opAtEnd)){//Error after equals button
        if(symbolContent.length==0 && operatorNode.textContent.trim()=='-'){/*Check if first symbol is - for negative number*/ 
        symbolNode.textContent+=operatorNode.textContent.trim();/**to appear to DOM!! */
        
        }
        else{
            /*Checks current h3 string when an op is pressed */
            /* If another op already exists , means we have already an equation */
            /* Calc the result of the eq above and put to DOM the result with the current operator that was pressed  */
            if(symbolContent.includes('+')||symbolContent.includes('-',1)||symbolContent.includes('*')||symbolContent.includes('/')){
                let calcArr = generateSymbolArr(symbolArr);/* ['1','2','+','2','5'] -> [12,'+',25]*/
                let subResult = calculations(calcArr);/*calculations result(number)*/

                if(subResult!='Err'){/*Error after op button */
                    symbolNode.textContent=subResult+operatorNode.textContent.trim();/**to appear to DOM!! */

                }
                else{
                    symbolNode.textContent=subResult;

                }
                
            }
            else{
            
                symbolNode.textContent+=operatorNode.textContent.trim();/**to appear to DOM!! */
            
            }
        }

    }
    
    
}
const resultHandler = ()=>{
    
    
    let symbolNode = document.querySelector('h3');

    if(symbolNode.textContent!='Err'){
        let symbols = symbolNode.textContent.split('');/*'12+25'->['1','2','+','2','5']*/ 
        let opNotAtEnd=symbols[symbols.length-1]!='+'&&symbols[symbols.length-1]!='-'&&symbols[symbols.length-1]!='*'&&symbols[symbols.length-1]!='/';
        let opIsIncl = (symbols.includes('+'))&&(symbols.includes('-',1))&&(symbols.includes('*'))&&(symbols.includes('/'));
    
        if(opNotAtEnd&&opIsIncl){//if op exists and is not at end of arr,means we have full equation
            let calcArray=generateSymbolArr(symbols);/* ['1','2','+','2','5'] -> [12,'+',25]*/ 
            let calcResult = calculations(calcArray);/*calculations result(number)*/ 
            symbolNode.textContent=calcResult;
        }
        else{
            symbolNode.textContent='Err';

        }

    }
    
    
   
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
function divide(num1,num2){
    res=num1/num2;
    
    if(num1!=0){
        if(num1%num2==0){/*if decimal */
        return res;
        }
        return (res).toPrecision(3);

    }
    return 'Err';
    }
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