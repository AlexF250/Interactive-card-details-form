'use strict';

const continueButton = document.querySelector(".continue-btn");
const formContainer = document.querySelector(".form__container");
const success = document.querySelector(".success");
const successButton = document.querySelector(".success-btn");
const formName = document.querySelector(".form__container-cardHolder");
const formNumber = document.querySelector(".form__container-cardNumber");
const formCvc = document.querySelector(".form__container-other-cvc");
const cardHolder = document.getElementById("cardHolder");
const cardNumber = document.getElementById("cardNumber");
const date = document.querySelector(".form__container-other-date");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvc = document.getElementById("cvc");
const cardFront = document.querySelector(".card__container-front-number");
const cardName = document.querySelector(".card__container-front-info-name");
const cardDate = document.querySelector(".card__container-front-info-date");
const cardBack = document.querySelector(".card__container-back-number");
const numberTest = /\D/;

const error = (input,type,form)=>{
    form.classList.add(type);
    input.classList.add("error");
}

const reset = (input,type,form) =>{
    form.classList.remove(type);
    input.classList.remove("error");
}

const resetE = (type,form) =>{
    form.classList.remove(type);
}

const nameValidation = ()=>{
    let namePass;
    if(cardHolder.value == ""){
        error(cardHolder,"errorEmpty",formName);
        namePass = false;
    }
    else{
        reset(cardHolder,"errorEmpty",formName);
        reset(cardHolder,"errorFormat",formName);
        namePass = true;
        return namePass
    }
}


const cardNumberValidation = ()=>{
    let numberPass;

    if(numberTest.test(cardNumber.value)){
        error(cardNumber,"errorFormat",formNumber);
        resetE("errorEmpty",formNumber);
        numberPass = false;
    }

    else if(cardNumber.value == ""){
        error(cardNumber,"errorEmpty",formNumber);
        resetE("errorFormat",formNumber);
        numberPass = false;
    }

    else{
    reset(cardNumber,"errorFormat",formNumber);
    reset(cardNumber,"errorNumber",formNumber);
    numberPass = true;
    return numberPass
    }
    
}

const dateValidation = () =>{
    let datePass;
    if(numberTest.test(month.value) && numberTest.test(year.value)){
        month.classList.add("error");
        year.classList.add("error");
        date.classList.add("errorFormat");
        datePass = false
    }

    else if(month.value == "" && year.value == ""){
        month.classList.add("error");
        year.classList.add("error");
        date.classList.add("errorEmpty");
        datePass = false
    }

    else{
    date.classList.remove("errorFormat");
    date.classList.remove("errorEmpty");
    year.classList.remove("error");
    month.classList.remove("error");
    datePass = true;
    return datePass
    }

}

const cvcValidation = ()=>{
    let cvcPass;
    if(cvc.value == ""){
        error(cvc,"errorEmpty",formCvc);
        resetE("errorFormat",formCvc);
        cvcPass = false;
    }
    else if(numberTest.test(cvc.value)){
        error(cvc,"errorFormat",formCvc);
        resetE("errorEmpty",formCvc);
        cvcPass = false;
    }
    else{
    reset(cvc,"errorFormat",formCvc);
    reset(cvc,"errorEmpty",formCvc);
    cvcPass = true;
    return cvcPass
    }
    
}


cardNumber.addEventListener('input',()=>{
    let cardNum = cardNumber.value;
    let filter = cardNum.match(/.{1,4}/g)
    cardFront.textContent = filter.join(" ");

    if(cardNumber == ""){
    cardFront.textContent = '0000 0000 0000 0000';
    }
})

cvc.addEventListener("input",()=>{
    let cardNum = cvc.value;
    cardBack.textContent = cardNum;
})

cardHolder.addEventListener("input",()=>{
    let cardNum = cardHolder.value;
    cardName.textContent = cardNum;
})


continueButton.addEventListener('click',(e)=>{

    e.preventDefault()

    let pass1 = nameValidation();
    let pass2 = cardNumberValidation();
    let pass3 = dateValidation();
    let pass4 = cvcValidation();


    if(pass1&&pass2&&pass3&&pass4){
    
    cardDate.textContent = `${month.value}/${year.value}`;

    formContainer.classList.add("displayNone");
    success.classList.add("displayFlex");
    }

})

successButton.addEventListener("click",(e)=>{
    formContainer.classList.remove("displayNone");
    success.classList.remove("displayFlex");
    
})

