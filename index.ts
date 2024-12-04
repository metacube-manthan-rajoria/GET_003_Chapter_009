const hasNumber: RegExp = /\d/;
const checkEmail: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
const checkPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

let employeeFormErrorId: string = "employee_form_message";
let vehicleFormErrorId: string = "vehicle_form_message";

// Employee and Vehicle Details
let employeeDetails: any = {
    itemIndex:0,
    employeeName: "",
    employeeGender: "",
    employeeEmail: "",
    employeePassword: "",
    employeeNumber: ""
};

let vehicleDetails: any = {
    itemIndex: 0,
    vehicleCompany: "",
    vehicleModel: "",
    vehicleType: "",
    vehicleNumber: "",
    employeeId: "",
    vehicleDescription: ""
};

// Pricing Variables
const vehiclePricing: any = {
    "two-wheeler": [5, 100, 500],
    "three-wheeler": [10, 200, 1000],
    "four-wheeler": [20, 500, 3500]
};
const pricingStringFormats: string[] = [" / Day", " / Month", " / Year"];
let currentCurrency: string = "$";
let currentPlan: string = "day";

// Utility Functions
function hideElementsByClass(className: string){
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    for(const element of elements){
        (element as HTMLElement).style.display = "none";
    }
}

function showElementById(id: string){
    let element: HTMLElement | null = document.getElementById(id);
    if(element == null){
        console.log("Element with id: " + id + " does not exists.")
        return "-1";
    }
    element.style.display = "block";
}

function setElementMessageById(id: string, message: string){
    let errorMessageSpan: HTMLElement | null = document.getElementById(id);
    if(errorMessageSpan == null){
        console.log("Element with id: " + id + " does not exists.")
        return "-1";
    }
    errorMessageSpan.style.display = "block";
    errorMessageSpan.innerText = message;
}

function getInputValueById(id: string): string {
    let element: HTMLElement | null = <HTMLInputElement>document.getElementById(id);
    if(element == null){
        console.log("Element with id: " + id + " does not exists.")
        return "-1";
    }
    return (element as HTMLInputElement).value
}

// Application Functions
function nextEmployeeSection(){
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("employee_form_item");

    if(employeeDetails.itemIndex < elements.length){
        if(employeeDetails.itemIndex == 0){
            let textBoxValue: string | number = getInputValueById("employee-name");
            
            if(textBoxValue.length < 2 || hasNumber.test(textBoxValue)){
                setElementMessageById(employeeFormErrorId, "Enter valid name")
                return;
            }

            employeeDetails.employeeName = textBoxValue;
            setElementMessageById(
                "employee_form_gender_label", 
                "Hi " + employeeDetails.employeeName + ", Can I know your gender."
            );
        }else if(employeeDetails.itemIndex == 1){
            let radio1 = <HTMLInputElement>document.getElementById("employee-gender-male");
            let radio2 = <HTMLInputElement>document.getElementById("employee-gender-female");
            let radio3 = <HTMLInputElement>document.getElementById("employee-gender-other");

            if(!radio1.checked && !radio2.checked && !radio3.checked){
                setElementMessageById(employeeFormErrorId, "Select one of the options");
                return;
            };
            setElementMessageById(
                "employee_form_email_label", 
                "Hi " + employeeDetails.employeeName + ", Can I know your Email."
            );
        }else if(employeeDetails.itemIndex == 2){
            let textBoxValue = getInputValueById("employee-email");
            let isEmailValid = checkEmail.test(textBoxValue);

            if(!isEmailValid){
                setElementMessageById(employeeFormErrorId, "Enter valid email");
                return;
            };
            employeeDetails.employeeEmail = textBoxValue;
        }else if(employeeDetails.itemIndex == 3){
            let textBoxValue1 = getInputValueById("employee-password");
            let textBoxValue2 = getInputValueById("employee-password-confirmation");
            
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
        hideElementsByClass(elements);
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
        hideElementsByClass(elements);
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
    if(currentCurrency === "$"){
        currencyConvertionRatio = 85;
    }else if(currentCurrency === "¥"){
        currencyConvertionRatio = 1/1.77;
    }else{
        currencyConvertionRatio = 1;
    }

    let i = 0;
    for(const option of pricingOptions){
        option.innerText = 
            currentCurrency + 
            (vehiclePricing[vehicleDetails.vehicleType][i] / currencyConvertionRatio).toFixed(2) + 
            pricingStringFormats[i];
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
    if(currentCurrency === "$"){
        currencyConvertionRatio = 85;
    }else if(currentCurrency === "¥"){
        currencyConvertionRatio = 1/1.77;
    }else{
        currencyConvertionRatio = 1;
    }

    pricingPlanDetailValue.innerText = 
        currentCurrency + 
        (vehiclePricing[vehicleDetails.vehicleType][priceIndex] / currencyConvertionRatio).toFixed(2) + 
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
    hideElementsByClass(elements1);
    hideElementsByClass(elements2);
    elements1[0].style.display = "block";
    elements2[0].style.display = "block";

    // Adding eventListner to radiobutton
    let radios = document.getElementsByClassName("employee-gender-radio");
    for(const radio of radios){
        radio.addEventListener("change", (e)=>{
            employeeDetails.employeeGender = e.target.value;
        });
    }

    const passwordFieldBorderCases: Function = (e: Event)=>{
        let element = <HTMLInputElement>e.target;
        if(element == null){
            return;
        }
        if(element.value.length < 8){
            element.style.border = "2px solid red";
        }else if(element.value.length < 10){
            element.style.border = "2px solid orange";
        }else if(element.value.length < 12){
            element.style.border = "2px solid yellow";
        }else{
            element.style.border = "2px solid green";
        }
    }
    document.getElementById("employee-password")?.addEventListener("blur", passwordFieldBorderCases());
    document.getElementById("employee-password-confirmation")?.addEventListener("blur", passwordFieldBorderCases());

    // Adding eventListner to Pricing Currency Selector Menu
    let pricingCurrency = document.getElementById("pricing-currency");
    pricingCurrency.addEventListener("change", (e)=>{
        let currency = e.target.value;

        if(currency === "yen"){
            currentCurrency = "¥";
        }else if(currency === "rupees"){
            currentCurrency = "₹";
        }else{
            currentCurrency = "$";
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