import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

export class Ingredients{
    public name:string;
    public amount:number;
    constructor(name:string,amount:number){
        this.name=name;
        this.amount=amount;
    }
}

