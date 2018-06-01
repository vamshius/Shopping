export class Item {
    public name: string;
    public description: string;
    public price: number;
    public category: string;
    public imported: boolean;

    constructor(name: string, desc: string, cost: number, categoryType: string, imported: boolean) {
        this.name = name;
        this.description = desc;
        this.price = cost;
        this.category = categoryType;
        this.imported = imported;
    }
}