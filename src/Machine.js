class Machine {
  constructor() {
    this.snacks = []
    this.balance = 0;
  }

  seeSelections() {
    return this.snacks
  }

  stock(inventory) {
    if(inventory == undefined) {
      throw Error("please do not troll. you cannot stock nothing.")
    }
    this.snacks = inventory
  }
  
  deposit(number){
    if(number !== 10 && number !== 20 && number !==50 && number !== 100 && number !== 500){
      throw Error("Invalid bill inserted!")
    } 
    this.balance += number;

    return `You have deposited Rs ${this.balance}`
  } 
  selectItem(code){
    const snack = this.snacks[code];
    if(!snack){
      return "The item you selected is unavailable";
    }else if(this.balance < snack?.price){
      return `Your deposit is insufficient.  Please add Rs ${snack.price - this.balance} for this item`;
    }

    let totalChange = this.balance - snack.price;
    let change = [];

    while(totalChange > 0){
      console.log(totalChange >= 100)
      switch(totalChange){
        case totalChange >= 500:
          change.push(500);
          totalChange -= 500;
          break;
        case totalChange >= 100:
          console.log("case 100 Ran")
          change.push(100);
          totalChange -= 100;
          break;
        case totalChange >= 50:
          change.push(50);
          totalChange -= 50;
          break;
        case totalChange >= 20:
          change.push(20);
          totalChange -= 20;
          break;
        case totalChange >= 10:
          change.push(10);
          totalChange -= 10;
          break;
        default:
          throw Error("Leftover change!")
      }
    }

    return { item: snack.name, change}
  }
}

module.exports = Machine