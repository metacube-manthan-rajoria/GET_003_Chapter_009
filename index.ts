import Employee from "./assets/Employee.js"
import {Vehicle, VehicleType} from "./assets/Vehicle.js"

// Regular Expressions
const hasNumber: RegExp = /\d/;
const checkEmail: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
const checkPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

// HTML Elements
let employeeSection: HTMLElement | null = document.getElementById("employee_section");
let vehicleSection: HTMLElement | null = document.getElementById("vehicle_section");

// HTML Element Id's
let employeeFormErrorId: string = "employee_form_message";
let vehicleFormErrorId: string = "vehicle_form_message";

// Employee and Vehicle Form Step Index
let currentEmployeeFormStep: number = 0;
let currentVehicleFormStep: number = 0;

// Variables
let employee: Employee;
let vehicle: Vehicle;
let currentEmployeeGender = "other";

// Application Functions
function nextEmployeeSection(){
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("employee_form_item");

    if(currentEmployeeFormStep < elements.length){
        if(currentEmployeeFormStep == 0){
            let textBoxValue: string = getInputValueById("employee-name");
            
            if(textBoxValue.length < 2 || hasNumber.test(textBoxValue)){
                setElementMessageById(employeeFormErrorId, "Enter valid name")
                return;
            }

            setElementMessageById(
                "employee_form_gender_label", 
                "Hi " + textBoxValue + ", Can I know your gender."
            );
            setElementMessageById(
                "employee_form_email_label", 
                "Hi " + textBoxValue + ", Can I know your Email."
            );
        }else if(currentEmployeeFormStep == 1){
            let radio1 = <HTMLInputElement>document.getElementById("employee-gender-male");
            let radio2 = <HTMLInputElement>document.getElementById("employee-gender-female");
            let radio3 = <HTMLInputElement>document.getElementById("employee-gender-other");

            if(!radio1.checked && !radio2.checked && !radio3.checked){
                setElementMessageById(employeeFormErrorId, "Select one of the options");
                return;
            };
        }else if(currentEmployeeFormStep == 2){
            let textBoxValue: string = getInputValueById("employee-email");
            let isEmailValid: boolean = checkEmail.test(textBoxValue);

            if(!isEmailValid){
                setElementMessageById(employeeFormErrorId, "Enter valid email");
                return;
            };
        }else if(currentEmployeeFormStep == 3){
            let textBoxValue1: string = getInputValueById("employee-password");
            let textBoxValue2: string = getInputValueById("employee-password-confirmation");
            
            let isPasswordValid: boolean = checkPassword.test(textBoxValue1);
            if(!isPasswordValid || textBoxValue1 !== textBoxValue2){
                setElementMessageById(
                    employeeFormErrorId, 
                    "Enter valid password: Min Length should be 8. Include Upper,Lower Characters, Numbers, Symbols"
                );
                return;
            }

            setElementMessageById("employee_form_button", "Add Employee");
        }else{
            let employeePhoneNumber: string = getInputValueById("employee-phone-number");

            if(employeePhoneNumber.length < 8){
                setElementMessageById(employeeFormErrorId, "Enter valid number");
                return;
            };

            let employeeName: string = getInputValueById("employee-name");
            let employeeGender: string = currentEmployeeGender;
            let employeeEmail: string = getInputValueById("employee-email");
            let employeePassword: string = getInputValueById("employee-password");
            employee = new Employee(employeeName, employeeGender, employeeEmail, employeePassword, employeePhoneNumber);

            employeeSection != null ? employeeSection.style.display = "none" : console.log("Cannot find employeeSection.");
            vehicleSection != null ? vehicleSection.style.display = "block" : console.log("Cannot find vehicleSection.");
            return;
        }

        currentEmployeeFormStep++;
        hideElementsByClass("employee_form_item");

        (elements[currentEmployeeFormStep] as HTMLElement).style.display = "block";
        (document.getElementById(employeeFormErrorId) as HTMLElement).innerText = "";
        (document.getElementById(employeeFormErrorId) as HTMLElement).style.display = "none";
    }else{
        (elements[elements.length - 1] as HTMLElement).style.display = "block";
    }
}

function nextVehicleSection(){
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName("vehicle_form_item");

    if(currentVehicleFormStep < elements.length){
        if(currentVehicleFormStep == 0){
            let textBoxValue: string = getInputValueById("vehicle-company");

            if(textBoxValue.length < 2){
                setElementMessageById(vehicleFormErrorId, "Enter valid company name");
                return;
            }
        }else if(currentVehicleFormStep == 1){
            let textBoxValue: string = getInputValueById("vehicle-model");

            if(textBoxValue.length < 2){
                setElementMessageById(vehicleFormErrorId, "Enter valid model name");
                return;
            }
        }else if(currentVehicleFormStep == 2){
            let textBoxValue: string = getInputValueById("vehicle-type");

            if(textBoxValue === "none"){
                setElementMessageById(vehicleFormErrorId, "Enter valid vehicle type");
                return;
            }
        }else if(currentVehicleFormStep == 3){
            let textBoxValue: string = getInputValueById("vehicle-number");

            if(textBoxValue.length < 6){
                setElementMessageById(vehicleFormErrorId, "Enter valid vehicle number");
                return;
            }
        }else if(currentVehicleFormStep == 4){
            let textBoxValue: string = getInputValueById("vehicle-employee-id");

            if(textBoxValue.length < 4){
                setElementMessageById(vehicleFormErrorId, "Enter valid id");
                return;
            }

            setElementMessageById("vehicle_form_button", "Add Vehicle");
        }else{
            let vehicleCompany: string = getInputValueById("vehicle-company");
            let vehicleModel: string = getInputValueById("vehicle-model");

            let vehicleType: VehicleType = VehicleType.TWO_WHEELER;
            let selectedVehicleType = getInputValueById("vehicle-type");
            if(selectedVehicleType === "three-wheeler") vehicleType = VehicleType.THREE_WHEELER;
            if(selectedVehicleType === "four-wheeler") vehicleType = VehicleType.FOUR_WHEELER;
            
            let vehicleRegistrationNumber: string = getInputValueById("vehicle-number");
            let employeeId: string = getInputValueById("vehicle-employee-id");
            let vehicleDescription: string = getInputValueById("vehicle-identification");

            vehicle = new Vehicle(vehicleCompany, vehicleModel, vehicleType, vehicleRegistrationNumber, employeeId, vehicleDescription);

            (document.getElementById("vehicle_section") as HTMLElement).style.display = "none";
            showPricingSection()
            return;
        }
        
        currentVehicleFormStep++;
        hideElementsByClass("vehicle_form_item");
        (elements[currentVehicleFormStep] as HTMLElement).style.display = "block";
        (document.getElementById(vehicleFormErrorId) as HTMLElement).innerText = "";
        (document.getElementById(vehicleFormErrorId) as HTMLElement).style.display = "none";
    }else{
        (elements[elements.length - 1] as HTMLElement).style.display = "block";
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