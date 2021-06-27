/* eslint-disable */
export default class Workspace {


    constructor(public id: number, public backgroundImage: string,  public title: string, public type: string, public update: string, public usersCount: number) { }


    get typeIcon(): string { 
        switch(this.type) {
            case "Client contract": return "assignment";
            case "Corporate": return "apartment";
            case "Group norms": return "book";
            case "Contract": return "description";
            default: return "home";
        }
    }
}