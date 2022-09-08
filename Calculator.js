
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};
const MAX_DIGITS = 5;

const clearHandler = ()=>{
    let symbolNode = document.querySelector('h3');
    symbolNode.textContent='';
}
const backspaceHandler = ()=>{
    let symbolNode = document.querySelector('h3');
    let symbolContent=symbolNode.textContent;
    let symbolArr = symbolContent.split('');
    let symbolStr;
    symbolArr.pop();
    symbolStr=symbolArr.join('');
    symbolNode.textContent=symbolStr;

}
const floatingHandler = (floatingPointContent)=>{
    let symbolNode = document.querySelector('h3');
    let symbolContent=symbolNode.textContent;
    if(symbolContent.length!=0&&symbolContent!='Err'){
        const symbolOpSeparator =(symbolString)=>{/*splits string according to included operator(except '-' at start if given(negative))*/ 
            let opKeys = Object.keys(OPERATORS);
            let splitStr =[];/** Init */
            let opCondition;
            let opIsIncl = false;
            for(op of opKeys){
                opCondition = op=='-'?1:0;

                switch(opCondition){
                    case 0:
                        if(symbolString.includes(op)){
                            opIsIncl=true;
                            splitStr=symbolString.split(op);  
                        }
                        break;
                    case 1:
                        if(symbolString.includes(op,1)){
                            opIsIncl=true;
                            splitStr=symbolString.split(op);  
                        }
                        break;
                    
                }

                /* if split is done break from loop */
                if(opIsIncl){
                    break;
                }
                
            }
            return splitStr;
        }
        let symbolArr = symbolOpSeparator(symbolContent);
        console.log(`split for floating handler ${symbolArr}`);
        if(symbolArr.length==0){/* operator is not included */
            symbolNode.textContent+=floatingPointContent.trim();
        }
        else{
           
            let lastSymbol =symbolArr[symbolArr.length-1];
            let isNotOp = lastSymbol!='+' && lastSymbol!='-' && lastSymbol!='*' && lastSymbol!='/';
            if(isNotOp && !(lastSymbol.includes('.'))&& lastSymbol!=''){/*if last condition is true means we have an op at end */
 
                 symbolNode.textContent+=floatingPointContent.trim();
            }

           
            
        }
        
    }


}
/*error cases: +-,(+-* div at start)*/ 
const DisplayDigitHandler=(digitNode)=>{
    let symbolNode = document.querySelector('h3');
    let symbolContent = symbolNode.textContent;
    if(symbolContent!='Err'){
        if(symbolContent.length!=0){
            let symbolStr = symbolContent+digitNode.textContent.trim();
            let symbolArr = generateSymbolArr(symbolStr);
            
            let symbolLast = symbolArr[symbolArr.length-1].toString();/* convert to string to check length for big number */
            let AbsSymbolLast = symbolLast;
            if(AbsSymbolLast.charAt(0)=='-'){// to validate properly in case of negative number
                AbsSymbolLast=AbsSymbolLast.slice(1,AbsSymbolLast.length-1);
            }
            
            symbolArr.pop();/* delete last element after saving it first to last symbol */
    
            if(AbsSymbolLast.length<=MAX_DIGITS){/* last number(last digit pressed is included) has less than 6 digits else round it */
                symbolNode.textContent+=digitNode.textContent.trim();
            }
            else{
                symbolLast=symbolLast.slice(0,-1);/* removing digit that makes digit length>max digit length */
                console.log(symbolLast);
                symbolNode.textContent=symbolArr.join('')+symbolLast;
            }

        }
        else{
            symbolNode.textContent+=digitNode.textContent.trim();
        }
       

        /*symbolNode.textContent+=digitNode.textContent.trim();*/
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
                    maxDigitValidate(symbolNode,subResult.toString());/* first round number if is to big then add op */
                    symbolNode.textContent+=operatorNode.textContent.trim();/**to appear to DOM!! *///subResult+

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
        let opIsIncl = (symbols.includes('+'))||(symbols.includes('-',1))||(symbols.includes('*'))||(symbols.includes('/'));
        if(opNotAtEnd&&opIsIncl){//if op exists and is not at end of arr,means we have full equation
            let calcArray=generateSymbolArr(symbols);/* ['1','2','+','2','5'] -> [12,'+',25]*/ 
            let calcResult = calculations(calcArray);/*calculations result(number)*/ 
            calcResult=calcResult.toString();
            /* check if the result has many digits */
            maxDigitValidate(symbolNode,calcResult);
          
                
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
let backspace = document.querySelector('.backspace-block');
let clear = document.querySelector('.clear');
let floatingPoint = document.querySelector('.floating-point');

clear.addEventListener('click',clearHandler);
equals.addEventListener('click',resultHandler);
backspace.addEventListener('click',backspaceHandler);
floatingPoint.addEventListener('click',()=>{floatingHandler(floatingPoint.textContent)});

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
function maxDigitValidate(node,resultText){
    let digitAbsolute=resultText;
    let checkNeg = false;
    let pos =0;
    if(resultText.charAt(0)=='-'){
        digitAbsolute=digitAbsolute.slice(1,resultText.length-1);// store the absolute value if negative , in order to not count  sign 
        checkNeg=true;                                          //as a digit in value's length 
    }
    if(digitAbsolute.length<MAX_DIGITS){
        node.textContent=resultText;
    }
    else{
        if(checkNeg){
            pos=1;//if negative let count one more position in slice -> slice(0,max+1)==slice(range of [sign position + max_digits_length])
        }
        node.textContent=resultText.slice(0,MAX_DIGITS+pos);
    }
}
function generateSymbolArr(array){
    let strNum = '';
    let newArr = [];
    for(let i=0;i<array.length;i++){

        if(array[i]=='+'||(array[i]=='-'&&(i!=0))||array[i]=='*'||array[i]=='/'){
            newArr.push(parseFloat(strNum));
            strNum='';
            newArr.push(array[i]);
        }
        else{
            strNum+=array[i];
               
        } 
    }
    newArr.push(parseFloat(strNum));
    console.log(`str:${newArr}`); 
    return newArr;


}
function calculations(symbolArr){ /*Take arr of nums and ops -> return calc result*/ 
        let prevVal=operate(symbolArr[0],symbolArr[2],symbolArr[1]); 
        return prevVal; 
    
    
}