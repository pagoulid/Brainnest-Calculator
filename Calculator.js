
const OPERATORS = {'+':0,'-':1,'*':2,'/':3};
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