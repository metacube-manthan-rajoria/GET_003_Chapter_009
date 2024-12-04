class Employee {
    private name: string = "";
    private gender: string = "";
    private email: string = "";
    private password: string = "";
    private number: string = "";

    private isValidObject: boolean = true;

    public constructor(
        name: string,
        gender: string,
        email: string,
        password: string,
        number: string
    ){
        this.name = name??="";
        this.gender = gender??="";
        this.email = email??="";
        this.password = password??="";
        this.number = number??="";
        if((name && gender && email && password && number) == null){
            this.isValidObject = false;
        }
    }

    public getName(): string {
        return this.name;
    }
    public getGender(): string {
        return this.gender;
    }
    public getEmail(): string {
        return this.email;
    }
    public getPassword(): string {
        return this.password;
    }
    public getNumber(): string {
        return this.number;
    }
    public isValid(): boolean {
        return this.isValidObject;
    }
}