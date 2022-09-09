
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};
const MAX_DIGITS = 15;

const clearHandler = ()=>{
    let symbolNode = document.querySelector('h1');
    symbolNode.textContent='';
}

const backspaceHandler = ()=>{
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
    
    
    /* if not screen empty and not err or start with '-' */
    if(symbolContent.length!=0&&symbolContent!='Err'&& symbolContent!='-'){

            /*INNER FUNC: splits string according to included operator(except '-' at start if given(negative))*/
            const symbolOpSeparator =(symbolString)=>{ 
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
            /*INNER FUNC:splits string according to included operator(except '-' at start if given(negative))*/

            let symbolArr = symbolOpSeparator(symbolContent);

            /*If operator is  included->if not means we are at first number yet */
            if(symbolArr.length==0){
                if(!symbolContent.includes('.')){
                    symbolNode.textContent+=floatingPointContent.trim();
                }
            }
            else{

                let lastSymbol =symbolArr[symbolArr.length-1];
            
                /* if last symbol not includes already floating point or last symbol is not op */
                if(!(lastSymbol.includes('.'))&& lastSymbol!=''){
                    
    
                     symbolNode.textContent+=floatingPointContent.trim();
                } 
                /* if last symbol not includes already floating point or last symbol is not op */  
                
            }
            /*If operator is  included */
    }
    /* if not screen empty and not err or start with '-' */
}

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
                if(symbolLast.includes('.')&&AbsSymbolLast.length==MAX_DIGITS+1){// Add digit if only max constraint is  exceeded by 1 
                                                                                //due to floating point
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

    let startWithNeg = symbolContent.length==0 && operatorNode.textContent.trim()=='-';
    let opAtEnd = symbolArr[symbolArr.length-1]=='+'||symbolArr[symbolArr.length-1]=='-'||symbolArr[symbolArr.length-1]=='*'
                    ||symbolArr[symbolArr.length-1]=='/';
    
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
                    maxDigitValidate(symbolNode,subResult.toString().trim());//first round result if exceeds max digits  
                    symbolNode.textContent+=operatorNode.textContent.trim();//to appear to DOM!! 
                }
                else{
                    symbolNode.textContent=subResult;
                }
                /*Division by zero case */  
            }
            else{
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
        let opNotAtEnd=symbols[symbols.length-1]!='+'&&symbols[symbols.length-1]!='-'&&symbols[symbols.length-1]!='*'&&
                        symbols[symbols.length-1]!='/';
        let opIsIncl = (symbols.includes('+'))||(symbols.includes('-',1))||(symbols.includes('*'))||(symbols.includes('/'));

        /*if an op exists and is not the last symbol->calc full equation*/ 
        if(opNotAtEnd&&opIsIncl){
            let calcArray=generateSymbolArr(symbols);/* ['1','2','+','2','5'] -> [12,'+',25]*/ 
            let calcResult = calculations(calcArray);
            calcResult=calcResult.toString().trim();
            maxDigitValidate(symbolNode,calcResult);//  check if the result has many digits 
          
                
        }
        else{
            symbolNode.textContent='Err';

        }
        /*if an op exists and is not the last symbol->calc full equation*/

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
    let pos=0;
    
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

        /*Allocate extra positions for slicing if neg and floating or floating*/ 
        if(checkNeg){
            if(!resultText.includes('.')){
                pos=1;
            }
            else{
                pos=2;
            }   
        }
        else{
            if(resultText.includes('.')){
                pos=1;
            }
        }
        /*Allocate extra poitions for slicing if neg and floating or floating*/ 

        let roundedResultText =resultText.slice(0,MAX_DIGITS+pos);

        /* If result has floating point of rounded result remove it */
        if(roundedResultText.includes('.')&&roundedResultText.charAt('.')==roundedResultText.length){
            roundedResultText=roundedResultText.slice(0,-1);
        }
        /* If result has floating point of rounded result remove it */

        node.textContent=roundedResultText;
    }
    /* If result exceeds max digits */
}
function generateSymbolArr(array){ // e.g.Input :['1','2','+','2','3','.','5']-> Output:[12,'+',23.5]
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