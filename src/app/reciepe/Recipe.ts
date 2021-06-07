import { Ingredients } from '../Shared/Ingridents';

export class Recipe{
    public name:string;
    public desc:string;
    public imgPath:string;
    public ingridents:Ingredients[];
    constructor(name:string,desc:string,imgPath:string,ingridents:Ingredients[]){
        this.name=name;
        this.desc=desc;
        this.imgPath=imgPath;
        this.ingridents=ingridents;
    }
}