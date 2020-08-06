export class Ingredient {
  public dishName: string;
  public dishPrice: number;
  public id?: string;

  constructor(name: string, amount: number, id?: string) {
    this.dishName = name;
    this.dishPrice = amount;
    this.id = id;
  }
}