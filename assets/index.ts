import Employee from "./Employee.js"
import Vehicle from "./Vehicle.js"
import {getVehiclePricing, getCurrencySymbol, getCurrencyConversionRatio, getPricingPlanFormat} from "./Ticket.js"

// Regular Expressions
const hasNumber: RegExp = /\d/;
const checkEmail: RegExp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
const checkPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

// HTML Elements
let employeeSection: HTMLElement | null = document.getElementById("employee_section");
let vehicleSection: HTMLElement | null = document.getElementById("vehicle_section");
let pricingSection: HTMLElement | null = document.getElementById("pricing_section");
let ticketSection: HTMLElement | null = document.getElementById("ticket_section");

// HTML Element Id's
let employeeFormItemId: string = "employee_form_item";
let employeeFormErrorId: string = "employee_form_message";
let vehicleFormItemId: string = "vehicle_form_item";
let vehicleFormErrorId: string = "vehicle_form_message";

// Employee and Vehicle Form Step Index
let currentEmployeeFormStep: number = 0;
let currentVehicleFormStep: number = 0;

// Variables
let employee: Employee;
let vehicle: Vehicle;
let currentEmployeeGender: string = "other";
let currentCurrencyFormat: string = "$";
let currentPlanType: string = "day";

// Application Functions
function nextEmployeeSection(){
    let elements: any = document.getElementsByClassName("employee_form_item");

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
    let elements: any = document.getElementsByClassName("vehicle_form_item");

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
            let vehicleType: string = getInputValueById("vehicle-type");
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
    let pricingOptions: any = document.getElementsByClassName("pricing_circle");
    if(pricingOptions == null){
        alert("Something went wrong, raise a ticket!");
        return;
    }

    if(pricingSection == null) return;
    pricingSection.style.display = "block";

    let currencyConvertionRatio = getCurrencyConversionRatio(getInputValueById("pricing-currency"));

    let planIndex: number = 0;
    for(const option of pricingOptions){
        let elementPlanType = "day";
        if(planIndex == 1) elementPlanType = "month";
        if(planIndex == 2) elementPlanType = "year";
        
        (option as HTMLElement).innerText = 
            currentCurrencyFormat + 
            (getVehiclePricing(vehicle.getType(), elementPlanType) / currencyConvertionRatio).toFixed(2) + 
            getPricingPlanFormat(currentPlanType);

        planIndex++;
    }
}

function showTicketSection(){
    if(pricingSection == null) return;
    pricingSection.style.display = "none";

    if(ticketSection == null) return;
    ticketSection.style.display = "block";

    let employeeTicketFields: any = document.getElementsByClassName("ticket_employee_value");
    let vehicleTicketFields: any = document.getElementsByClassName("ticket_vehicle_value");
    if((employeeTicketFields && vehicleTicketFields) == null){
        alert("Something went wrong, raise a ticket!");
        return;
    }
    if(!employee.isValid() || !vehicle.isValid()){
        alert("We ran into an error, raise a ticket");
        return;
    }
    let pricingPlanDetailValue: HTMLElement | null = document.getElementById("pricing_plan_details_value");

    // Populating all the details fields
    (employeeTicketFields[0] as HTMLElement).innerText = employee.getName();
    (employeeTicketFields[1] as HTMLElement).innerText = employee.getGender();
    (employeeTicketFields[2] as HTMLElement).innerText = employee.getEmail();
    (employeeTicketFields[3] as HTMLElement).innerText = employee.getNumber();

    (vehicleTicketFields[0] as HTMLElement).innerText = vehicle.getCompany();
    (vehicleTicketFields[1] as HTMLElement).innerText = vehicle.getModel();
    (vehicleTicketFields[2] as HTMLElement).innerText = vehicle.getType().toString();
    (vehicleTicketFields[3] as HTMLElement).innerText = vehicle.getRegistrationNumber();
    (vehicleTicketFields[4] as HTMLElement).innerText = vehicle.getEmployeeId();
    (vehicleTicketFields[5] as HTMLElement).innerText = vehicle.getDescription();

    let currencyConvertionRatio = getCurrencyConversionRatio(getInputValueById("pricing-currency"));

    if(pricingPlanDetailValue == null) return;
    pricingPlanDetailValue.innerText = 
        currentCurrencyFormat + 
        (getVehiclePricing(vehicle.getType(), currentPlanType) / currencyConvertionRatio).toFixed(2) + 
        " per " + currentPlanType;
}

// Setting up eventListners and initial State
function initialize(){
    // Hiding Sections Initially
    hideElementById("vehicle_section");
    hideElementById("pricing_section");
    hideElementById("ticket_section");

    // Hiding all form elements except first
    hideElementsByClass(employeeFormItemId);
    hideElementsByClass(vehicleFormItemId);
    (document.getElementsByClassName(employeeFormItemId)[0] as HTMLElement).style.display = "block";
    (document.getElementsByClassName(vehicleFormItemId)[0] as HTMLElement).style.display = "block";

    // Adding eventListner to radiobutton
    let radioButtons: any = document.getElementsByClassName("employee-gender-radio");
    if(radioButtons == null){
        alert("Something went wrong, raise a ticket!");
        return;
    }
    for(const radio of radioButtons){
        radio.addEventListener("change", (e: Event)=>{
            currentEmployeeGender = (e.target as HTMLInputElement).value;
        });
    }

    const passwordFieldBorderCases: Function = (e: Event)=>{
        let element = <HTMLInputElement>e.target;
        if(element == null) return;
        let passwordLength = element.value.length;
        if(passwordLength < 8){
            element.style.border = "2px solid red";
        }else if(passwordLength < 10){
            element.style.border = "2px solid orange";
        }else if(passwordLength < 12){
            element.style.border = "2px solid yellow";
        }else{
            element.style.border = "2px solid green";
        }
    }
    document.getElementById("employee-password")?.addEventListener("blur", (e: Event)=>{
        passwordFieldBorderCases(e);
    });
    document.getElementById("employee-password-confirmation")?.addEventListener("blur", (e: Event)=>{
        passwordFieldBorderCases(e);
    });

    // Adding eventListner to Pricing Currency Selector Menu
    let pricingCurrencyElement: HTMLElement | null = document.getElementById("pricing-currency");
    if(pricingCurrencyElement == null) return;

    pricingCurrencyElement.addEventListener("change", (e: Event)=>{
        let currencyFormat: string = (e.target as HTMLInputElement).value;
        currentCurrencyFormat = getCurrencySymbol(currencyFormat);
        showPricingSection();
    })

    // Adding eventListner to Pricing Option Button
    let pricingPlanButtons: any = document.getElementsByClassName("pricing_option_button");
    if(pricingPlanButtons == null){
        alert("Something went wrong, raise a ticket!");
        return;
    }
    for(const button of pricingPlanButtons){
        button.addEventListener("click", (e: Event)=>{
            currentPlanType = (e.target as HTMLInputElement).value;
            showTicketSection();
        });
    }
}

// Utility Functions
function hideElementsByClass(className: string){
    let elements: any = document.getElementsByClassName(className);
    if(elements == null){
        alert("Something went wrong, raise a ticket!");
        console.log("Cannot find class : " + className);
        return;
    }
    for(const element of elements){
        (element as HTMLElement).style.display = "none";
    }
}

function hideElementById(id: string){
    let element: HTMLElement | null = document.getElementById(id);
    if(element == null){
        alert("Something went wrong, raise a ticket!");
        console.log("Element with id: " + id + " does not exists.")
        return;
    }
    element.style.display = "none";
}

function setElementMessageById(id: string, message: string){
    let errorMessageSpan: HTMLElement | null = document.getElementById(id);
    if(errorMessageSpan == null){
        alert("Something went wrong, raise a ticket!");
        console.log("Element with id: " + id + " does not exists.")
        return;
    }
    errorMessageSpan.style.display = "block";
    errorMessageSpan.innerText = message;
}

function getInputValueById(id: string): string {
    let element: HTMLElement | null = <HTMLInputElement>document.getElementById(id);
    if(element == null){
        alert("Something went wrong, raise a ticket!");
        console.log("Element with id: " + id + " does not exists.")
        return "-1";
    }
    return (element as HTMLInputElement).value
}

window.onload = ()=>{
    initialize();
}
document.getElementById("employee_form_button")?.addEventListener("click", ()=>{
    nextEmployeeSection();
})
document.getElementById("vehicle_form_button")?.addEventListener("click", ()=>{
    nextVehicleSection();
})