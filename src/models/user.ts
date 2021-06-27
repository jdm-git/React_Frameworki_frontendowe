import Company from "./company";

export default class User {
    public id: number = 0;
    public name: string = "";
    public phone: string = "";
    public username: string = "";
    public website: string = "";
    public company: Company = new Company();
    public userPhoto: string = "";
}