const hasNumber = /\d/;
const checkEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

const pricing = {
    "two-wheeler": [5, 100, 500],
    "three-wheeler": [10, 200, 1000],
    "four-wheeler": [20, 500, 3500]
};
const pricingDivision = [" / Day", " / Month", " / Year"];
let currentCurrencyFormat = "$";

let currentPlan = "day";

let employeeDetails = {
    itemIndex:0,
    employeeName: "",
    employeeGender: "",
    employeeEmail: "",
    employeePassword: "",
    employeeNumber: ""
};

let vehicleDetails = {
    itemIndex: 0,
    vehicleCompany: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleNumber: "",
    employeeId: "",
    vehicleDescription: ""
};

function hideSection(elements){
    for(const element of elements){
        element.style.display = "none";
    }
}

function nextEmployeeSection(){
    let elements = document.getElementsByClassName("employee_form_item");
    let formMessage = document.getElementById("employee_form_message");
    
    if(employeeDetails.itemIndex < elements.length){
        if(employeeDetails.itemIndex == 0){
            let textBox = document.getElementById("employee-name");
            let textBoxValue = textBox.value;

            if(textBoxValue.length < 2 || hasNumber.test(textBoxValue)){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid name";
                return;
            } 
            employeeDetails.employeeName = textBoxValue;
            let label = document.getElementById("employee_form_gender_label");
            label.innerText = "Hi " + employeeDetails.employeeName + ", Can I know your gender.";
        }else if(employeeDetails.itemIndex == 1){
            let radio1 = document.getElementById("employee-gender-male");
            let radio2 = document.getElementById("employee-gender-female");
            let radio3 = document.getElementById("employee-gender-other");

            if(!radio1.checked && !radio2.checked && !radio3.checked){
                formMessage.style.display = "block";
                formMessage.innerText = "Select one of the options";
                return;
            };
            let label = document.getElementById("employee_form_email_label");
            label.innerText = "Hi " + employeeDetails.employeeName + ", Can I know your Email.";
        }else if(employeeDetails.itemIndex == 2){
            let textBox = document.getElementById("employee-email");
            let textBoxValue = textBox.value;
            let isEmailValid = checkEmail.test(textBoxValue);

            if(!textBox.validity.valid || !isEmailValid){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid email";
                return;
            };
            employeeDetails.employeeEmail = textBoxValue;

            document.getElementById("employee-password").addEventListener("blur", (e)=>{
                if(e.target.value.length < 8){
                    e.target.style.border = "2px solid red";
                }else if(e.target.value.length < 10){
                    e.target.style.border = "2px solid orange";
                }else if(e.target.value.length < 12){
                    e.target.style.border = "2px solid yellow";
                }else{
                    e.target.style.border = "2px solid green";
                }
            });
            document.getElementById("employee-password-confirmation").addEventListener("focusout", (e)=>{
                if(e.target.value.length < 8){
                    e.target.style.border = "2px solid red";
                }else if(e.target.value.length < 10){
                    e.target.style.border = "2px solid orange";
                }else if(e.target.value.length < 12){
                    e.target.style.border = "2px solid yellow";
                }else{
                    e.target.style.border = "2px solid green";
                }
            });
        }else if(employeeDetails.itemIndex == 3){
            let textBox1 = document.getElementById("employee-password");
            let textBox2 = document.getElementById("employee-password-confirmation");
            let textBoxValue1 = textBox1.value;
            let textBoxValue2 = textBox2.value;
            
            let hasUpperLetter = false;
            let hasLowerLetter = false;
            let hasNumber = false;
            let hasSpecialSymbols = false;
            for(let i = 0; i<textBoxValue1.length; i++){
                let currentChar = textBoxValue1.charAt(i).charCodeAt(0);
                if(currentChar >=65 && currentChar <=90){
                    hasUpperLetter = true;
                }else if(currentChar >=97 && currentChar <=122){
                    hasLowerLetter = true
                }else if(currentChar >=48 && currentChar <=57){
                    hasNumber = true;
                }else if((currentChar >=33 && currentChar <=46) || currentChar == 64){
                    hasSpecialSymbols = true;
                }
            }

            let passwordTest = hasLowerLetter && hasUpperLetter && hasNumber && hasSpecialSymbols;

            if(
                !textBox1.validity.valid || 
                !textBox2.validity.valid || 
                textBoxValue1!==textBoxValue2 ||
                !passwordTest
            ){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid password: Min Length should be 8. Include Upper,Lower Characters, Numbers, Symbols";
                return;
            };
            employeeDetails.employeePassword = textBoxValue1;

            let button = document.getElementById("employee_form_button");
            button.innerText = "Add Employee";
        }else{
            let textBox = document.getElementById("employee-phone-number");
            let textBoxValue = textBox.value;

            if(textBoxValue.length < 8){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid number";
                return;
            };
            employeeDetails.employeeNumber = textBoxValue;

            let employeeSection = document.getElementById("employee_section");
            employeeSection.style.display = "none";
            let vehicleSection = document.getElementById("vehicle_section");
            vehicleSection.style.display = "block";

            return;
        }

        employeeDetails.itemIndex++;
        hideSection(elements);
        elements[employeeDetails.itemIndex].style.display = "block";
        formMessage.innerText = "";
        formMessage.style.display = "none";
    }else{
        elements[elements.length - 1].style.display = "block";
    }
}

function nextVehicleSection(){
    let elements = document.getElementsByClassName("vehicle_form_item");
    let formMessage = document.getElementById("vehicle_form_message");

    if(vehicleDetails.itemIndex < elements.length){
        if(vehicleDetails.itemIndex == 0){
            let textBox = document.getElementById("vehicle-company");
            let textBoxValue = textBox.value;

            if(textBoxValue.length < 2){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid company name";
                return;
            } 
            vehicleDetails.vehicleCompany = textBoxValue;
        }else if(vehicleDetails.itemIndex == 1){
            let textBox = document.getElementById("vehicle-model");
            let textBoxValue = textBox.value;

            if(textBoxValue.length < 2){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid model name";
                return;
            } 
            vehicleDetails.vehicleModel = textBoxValue;
        }else if(vehicleDetails.itemIndex == 2){
            let selectBox = document.getElementById("vehicle-type");
            let textBoxValue = selectBox.value;

            if(textBoxValue === "none"){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid vehicle type";
                return;
            } 
            vehicleDetails.vehicleType = textBoxValue;
        }else if(vehicleDetails.itemIndex == 3){
            let textBox = document.getElementById("vehicle-number");
            let textBoxValue = textBox.value;

            if(textBoxValue.length < 6){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid vehicle number";
                return;
            } 
            vehicleDetails.vehicleNumber = textBoxValue;
        }else if(vehicleDetails.itemIndex == 4){
            let textBox = document.getElementById("vehicle-employee-id");
            let textBoxValue = textBox.value;

            if(textBoxValue.length < 4){
                formMessage.style.display = "block";
                formMessage.innerText = "Enter valid id";
                return;
            } 
            vehicleDetails.employeeId = textBoxValue;

            let button = document.getElementById("vehicle_form_button");
            button.innerText = "Add Vehicle";
        }else{
            let textArea = document.getElementById("vehicle-identification");
            let textAreaValue = textArea.value;
            vehicleDetails.vehicleDescription = textAreaValue;

            let vehicleSection = document.getElementById("vehicle_section");
            vehicleSection.style.display = "none";
            
            showPricingSection()

            return;
        }
        
        vehicleDetails.itemIndex++;
        hideSection(elements);
        elements[vehicleDetails.itemIndex].style.display = "block";
        formMessage.innerText = "";
        formMessage.style.display = "none";
    }else{
        elements[elements.length - 1].style.display = "block";
    }
}

function showPricingSection(){
    let pricingSection = document.getElementById("pricing_section");
    let pricingOptions = document.getElementsByClassName("pricing_circle");
    pricingSection.style.display = "block";

    let currencyConvertionRatio = 1;
    if(currentCurrencyFormat === "$"){
        currencyConvertionRatio = 85;
    }else if(currentCurrencyFormat === "¥"){
        currencyConvertionRatio = 1/1.77;
    }else{
        currencyConvertionRatio = 1;
    }

    let i = 0;
    for(const option of pricingOptions){
        option.innerText = 
            currentCurrencyFormat + 
            (pricing[vehicleDetails.vehicleType][i] / currencyConvertionRatio).toFixed(2) + 
            pricingDivision[i];
        i++;
    }
}

function showTicketSection(){
    let pricingSection = document.getElementById("pricing_section");
    pricingSection.style.display = "none";

    let ticketSection = document.getElementById("ticket_section");
    ticketSection.style.display = "block";

    let employeeTicketFields = document.getElementsByClassName("ticket_employee_value");
    let vehicleTicketFields = document.getElementsByClassName("ticket_vehicle_value");
    let pricingPlanDetailValue = document.getElementById("pricing_plan_details_value");

    // Populating all the details fields
    employeeTicketFields[0].innerText = employeeDetails.employeeName;
    employeeTicketFields[1].innerText = employeeDetails.employeeGender;
    employeeTicketFields[2].innerText = employeeDetails.employeeEmail;
    employeeTicketFields[3].innerText = employeeDetails.employeeNumber;

    vehicleTicketFields[0].innerText = vehicleDetails.vehicleCompany;
    vehicleTicketFields[1].innerText = vehicleDetails.vehicleModel;
    vehicleTicketFields[2].innerText = vehicleDetails.vehicleType;
    vehicleTicketFields[3].innerText = vehicleDetails.vehicleNumber;
    vehicleTicketFields[4].innerText = vehicleDetails.employeeId;
    vehicleTicketFields[5].innerText = vehicleDetails.vehicleDescription;

    // Displaying the final plan
    let priceIndex = 0;
    if(currentPlan === "month"){
        priceIndex = 1;
    }else if(currentPlan === "year"){
        priceIndex = 2;
    }else{
        priceIndex = 0;
    }

    let currencyConvertionRatio = 1;
    if(currentCurrencyFormat === "$"){
        currencyConvertionRatio = 85;
    }else if(currentCurrencyFormat === "¥"){
        currencyConvertionRatio = 1/1.77;
    }else{
        currencyConvertionRatio = 1;
    }

    pricingPlanDetailValue.innerText = 
        currentCurrencyFormat + 
        (pricing[vehicleDetails.vehicleType][priceIndex] / currencyConvertionRatio).toFixed(2) + 
        " per " + currentPlan;
}

/**
 * Setting up eventListners and initial State
 */
function initialize(){
    // Hiding Sections Initially
    let vehicleSection = document.getElementById("vehicle_section");
    vehicleSection.style.display = "none";
    let pricingSection = document.getElementById("pricing_section");
    pricingSection.style.display = "none";
    let ticketSection = document.getElementById("ticket_section");
    ticketSection.style.display = "none";

    // Hiding all form elements except first 
    let elements1 = document.getElementsByClassName("employee_form_item");
    let elements2 = document.getElementsByClassName("vehicle_form_item");
    hideSection(elements1);
    hideSection(elements2);
    elements1[0].style.display = "block";
    elements2[0].style.display = "block";

    // Adding eventListner to radiobutton
    let radios = document.getElementsByClassName("employee-gender-radio");
    for(const radio of radios){
        radio.addEventListener("change", (e)=>{
            employeeDetails.employeeGender = e.target.value;
        });
    }

    // Adding eventListner to Pricing Currency Selector Menu
    let pricingCurrency = document.getElementById("pricing-currency");
    pricingCurrency.addEventListener("change", (e)=>{
        let currency = e.target.value;

        if(currency === "yen"){
            currentCurrencyFormat = "¥";
        }else if(currency === "rupees"){
            currentCurrencyFormat = "₹";
        }else{
            currentCurrencyFormat = "$";
        }
        showPricingSection();
    })

    // Adding eventListner to Pricing Option Button
    let pricingPlanButtons = document.getElementsByClassName("pricing_option_button");
    for(const button of pricingPlanButtons){
        button.addEventListener("click", (e)=>{
            currentPlan = e.target.value;
            showTicketSection();
        });
    }
}