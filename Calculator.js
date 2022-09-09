
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};
const MAX_DIGITS = 5;
let FIRST=true;//needed for floating in max digits

const clearHandler = ()=>{
    let symbolNode = document.querySelector('h1');
    FIRST=true;
    symbolNode.textContent='';
}
const backspaceHandler = ()=>{
    FIRST=true;
    let symbolNode = document.querySelector('h1');
    let symbolContent=symbolNode.textContent;
    let symbolArr = symbolContent.split('');
    let symbolStr;
    symbolArr.pop();
    symbolStr=symbolArr.join('');
    symbolNode.textContent=symbolStr;

}

const floatingHandler = (floatingPointContent)=>{
    let symbolNode = document.querySelector('h1');
    let symbolContent=symbolNode.textContent;
    
    console.log(symbolContent.indexOf('.',1)!=-1);
    
    if(symbolContent.length!=0&&symbolContent!='Err'&& symbolContent!='-'){
       
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
               
                if(!symbolContent.includes('.')){
                    symbolNode.textContent+=floatingPointContent.trim();
                }
                
            }
            else{
                
                let lastSymbol =symbolArr[symbolArr.length-1];
                let isNotOp = lastSymbol!='+' && lastSymbol!='-' && lastSymbol!='*' && lastSymbol!='/';
                if(isNotOp && !(lastSymbol.includes('.'))&& lastSymbol!=''){/*if last condition is true means we have an op at end */
                    
    
                     symbolNode.textContent+=floatingPointContent.trim();
                }
    
               
                
            }

       // }
      
        
    }


}
/*error cases: +-,(+-* div at start)*/ 
const DisplayDigitHandler=(digitNode)=>{
    let symbolNode = document.querySelector('h1');
    let symbolContent = symbolNode.textContent;

    if(symbolContent!='Err'){// from previous possible operations
        if(symbolContent.length!=0){// screen is not empty

            let symbolStr = symbolContent+digitNode.textContent.trim();
            let symbolArr = generateSymbolArr(symbolStr);//e.g.'12+86'->[12,'+',86] , 6 is digit we already typed
            
            let symbolLast = symbolArr[symbolArr.length-1].toString();/* convert last number to string to check length for big number */
                                                                      /*Want to check last -> currently typing digits of this number*/ 
            /* Keep absolute value if negative */
            let AbsSymbolLast = symbolLast;
            if(AbsSymbolLast.charAt(0)=='-'){
                AbsSymbolLast=AbsSymbolLast.slice(1,AbsSymbolLast.length);
            }
            /* Keep absolute value if negative */

            /* last number(last digit pressed is included) has less than 6 digits else round it */
            if(AbsSymbolLast.length<=MAX_DIGITS){               
                symbolNode.textContent+=digitNode.textContent.trim();
            }
            else{
                if(symbolLast.includes('.')&&AbsSymbolLast.length==MAX_DIGITS+1){// Add digit if only max constraint is exceeded by 1 
                //if(symbolLast.includes('.')){//&&FIRST){                       //due to floating point
                    //FIRST=false;
                    symbolNode.textContent+=digitNode.textContent.trim();
                } 
            }
            /* last number(last digit pressed is included) has less than 6 digits else round it */

        }
        else{// if empty screen
            symbolNode.textContent+=digitNode.textContent.trim();
        }
    }
    
}
const DisplayOpHandler=(operatorNode)=>{
    let symbolNode = document.querySelector('h1');
    let symbolContent = symbolNode.textContent;
    let symbolArr=symbolContent.split('');//e.g ['1','2','+','2','.'...]

    let opAtStart = symbolContent.length===0 && operatorNode.textContent.trim()!='-';
    let startWithNeg = symbolContent.length==0 && operatorNode.textContent.trim()=='-';
    let opAtEnd = symbolArr[symbolArr.length-1]=='+'||symbolArr[symbolArr.length-1]=='-'||symbolArr[symbolArr.length-1]=='*'
                    ||symbolArr[symbolArr.length-1]=='/';
    
    //&&(!opAtStart)
    /*If Error or previous (symbol before currently op typed) is op do not insert to DOM*/
    if(symbolContent!='Err'&&(!opAtEnd)){

        /*If screen empty and  '-' is pressed for negative insert to DOM  */
        if(startWithNeg){
            symbolNode.textContent+=operatorNode.textContent.trim();        
        
        }
        else{ //last symbol is digit,so if another op already exists , means we have already an equation
    
            /* Last symbol is digit,if other op already exists,we have already an equation*/
            /* Do calculation and put to DOM with curr pressed operator else just add the pressed op */
            if(symbolContent.includes('+')||symbolContent.includes('-',1)||symbolContent.includes('*')||symbolContent.includes('/')){
                let calcArr = generateSymbolArr(symbolArr);/* ['1','2','+','2','5'] -> [12,'+',25]*/
                let subResult = calculations(calcArr);

                /*Division by zero case */
                if(subResult!='Err'){
                    //FIRST=true;
                    maxDigitValidate(symbolNode,subResult.toString().trim());//first round result if exceeds max digits  
                    symbolNode.textContent+=operatorNode.textContent.trim();//to appear to DOM!! 

                }
                else{
                    symbolNode.textContent=subResult;

                }
                /*Division by zero case */  
            }
            else{
                //FIRST=true;
                symbolNode.textContent+=operatorNode.textContent.trim();/**to appear to DOM!! */
            }
            /* Last symbol is digit,if other op already exists,we have already an equation*/
            /* Do calculation and put to DOM with curr pressed operator else just add the pressed op */
        }
        /*If screen empty and  '-' is pressed for negative insert to DOM */

    }
   /*If Error or previous (symbol before currently op typed) is op do not insert to DOM*/ 
    
}
const resultHandler = ()=>{
    
    
    let symbolNode = document.querySelector('h1');
    
    if(symbolNode.textContent!='Err'){
        
        let symbols = symbolNode.textContent.split('');/*'12+25'->['1','2','+','2','5']*/ 
        let opNotAtEnd=symbols[symbols.length-1]!='+'&&symbols[symbols.length-1]!='-'&&symbols[symbols.length-1]!='*'&&symbols[symbols.length-1]!='/';
        let opIsIncl = (symbols.includes('+'))||(symbols.includes('-',1))||(symbols.includes('*'))||(symbols.includes('/'));
        if(opNotAtEnd&&opIsIncl){//if op exists and is not at end of arr,means we have full equation
            let calcArray=generateSymbolArr(symbols);/* ['1','2','+','2','5'] -> [12,'+',25]*/ 
            let calcResult = calculations(calcArray);/*calculations result(number)*/ 
            calcResult=calcResult.toString().trim();
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
        return (res).toPrecision(MAX_DIGITS);

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
    /* If result negative store abs value of result-> check only length of digits */
    if(resultText.charAt(0)=='-'){
        digitAbsolute=digitAbsolute.slice(1,resultText.length);// store the absolute value if negative , in order to not count  sign 
        checkNeg=true;                                          //as a digit in value's length 
    }
    /* If result negative store abs value of result-> check only length of digits */
    
    /* If result exceeds max digits */
    if(digitAbsolute.length<=MAX_DIGITS){
        node.textContent=resultText;
    }
    else{

        let roundedResultText =resultText.slice(0,MAX_DIGITS-1);
        /* If result has floating point */
        if(roundedResultText.includes('.')){
            roundedResultText=roundedResultText.slice(0,-1);// remove last .
        }
        /* If result has floating point */

        node.textContent=roundedResultText;
    }
    /* If result exceeds max digits */
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