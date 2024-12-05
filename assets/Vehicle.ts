class Vehicle {
    private company: string = "";
    private model: string = "";
    private type: string = "";
    private registrationNumber: string = "";
    private employeeId: string = "";
    private description: string = "";

    private isValidObject: boolean = true;

    public constructor(
        company: string,
        model: string,
        type: string,
        registrationNumber: string,
        employeeId: string,
        description: string
    ){
        this.company = company??="";
        this.model = model??="";
        this.type = type??="";
        this.registrationNumber = registrationNumber??="";
        this.employeeId = employeeId??="";
        this.description = description??="";

        if((company && model && type && registrationNumber && employeeId) == null){
            this.isValidObject = false;
        }
    }

    public getCompany(): string{
        return this.company;
    }
    public getModel(): string {
        return this.model;
    }
    public getType(): string {
        return this.type.toString();
    }
    public getRegistrationNumber(): string {
        return this.registrationNumber;
    }
    public getEmployeeId(): string {
        return this.employeeId;
    }
    public getDescription(): string {
        return this.description;
    }
    public isValid(): boolean {
        return this.isValidObject;
    }
}

export default Vehicle;