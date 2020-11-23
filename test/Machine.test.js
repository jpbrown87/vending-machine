const Machine = require('../src/Machine')

describe('The vending machine', () => {
  let vendingMachine;
  beforeEach(()=>{
    vendingMachine = new Machine();
  })

  it('is initialized with no items', () => {
    // SEAT
    // setup
    

    // exercise & assert
    expect(vendingMachine.seeSelections()).toEqual([])

    // teardown, not needed
  })

  it('can stock one snack', () => {
    // setup
    
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }

    // exercise
    vendingMachine.stock([snack])

    // assert
    expect(vendingMachine.seeSelections()).toEqual([snack])
  })

  // someone attempts to stock without inventory
  // it('stocks nothing if there is no inventory passed', () => {
  //   // setup
  //   const vendingMachine = new Machine()

  //   // exercise
  //   vendingMachine.stock()

  //   // assertion
  //   expect(vendingMachine.seeSelections()).toEqual([])
  // })

  it('displays an error if no inventory comes with stocking', () => {
    // setup
    
    const displayMessage = "please do not troll. you cannot stock nothing."

    // exercise & assert
    expect(() => vendingMachine.stock()).toThrow(displayMessage)
  })
  it('shows total deposited', () => {
    
    const expected = 'You have deposited Rs 100'

    expect(vendingMachine.deposit(100)).toEqual(expected)
  })

  describe('accepts only 10, 20 50, 100, 500 bills',()=>{
    it('rejects invalid bills',()=>{
      const expectedError = "Invalid bill inserted!";
      expect(()=>vendingMachine.deposit(30)).toThrow(expectedError)
      expect(()=>vendingMachine.deposit(150)).toThrow(expectedError)
      expect(()=>vendingMachine.deposit(1000)).toThrow(expectedError)
      expect(()=>vendingMachine.deposit(300)).toThrow(expectedError)
      expect(()=>vendingMachine.deposit(25)).toThrow(expectedError)
    })

    it('accepts all valid bills',()=>{
      const expectedError = "Invalid bill inserted!";

      expect(()=>vendingMachine.deposit(10)).not.toThrow(expectedError)
      expect(()=>vendingMachine.deposit(20)).not.toThrow(expectedError)
      expect(()=>vendingMachine.deposit(50)).not.toThrow(expectedError)
      expect(()=>vendingMachine.deposit(100)).not.toThrow(expectedError)
      expect(()=>vendingMachine.deposit(500)).not.toThrow(expectedError)
    })
  })

  describe('vending machine should keep total of deposited money',() => {
    it('adds money that is deposited',() => { 

      expect(vendingMachine.deposit(10)).toEqual("You have deposited Rs 10")
      expect(vendingMachine.deposit(20)).toEqual("You have deposited Rs 30")
      expect(vendingMachine.deposit(50)).toEqual("You have deposited Rs 80")
    })
  })

  describe('tells customer when item is unavailable', ()=>{
    it('displays "The item you selected is unavailable"',()=>{
      const expected = 'The item you selected is unavailable';
      const code = 0;
      expect(vendingMachine.selectItem(code)).toEqual(expected)
    })
  }) 
  
  describe('Customer receives notification if balance is insufficient', ()=>{
    it('returns notifcation that balance is insufficient',()=>{
      const code = 0;
      const snack = {
        name: 'macadamia nuts',
        price: 250
      }
      vendingMachine.stock([snack])
      
      expect(vendingMachine.selectItem(code)).toEqual("Your deposit is insufficient.  Please add Rs 250 for this item")
      vendingMachine.deposit(100)
      expect(vendingMachine.selectItem(code)).toEqual("Your deposit is insufficient.  Please add Rs 150 for this item")
    })
  }) 

  describe('Receive change when customer has overpaid', ()=>{
    it('dispenses change when customer has overpaid',()=>{
      const code = 0;
      const expected = {
        item: 'macadamia nuts', 
        change: [100, 100, 50]
      };
      const snack = {
        name: 'macadamia nuts',
        price: 250
      }
      vendingMachine.stock([snack])
      vendingMachine.deposit(500)
      expect(vendingMachine.selectItem(code)).toEqual(expected)
    })
  })
})