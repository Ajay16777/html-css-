let fridgeA = {
  id: "fg-1",
  name: "Parkdale fridge",
  num_items_accepted: 100,
  can_accept_items: 18,
  accepted_types: ["dairy", "produce"],
  contact_person: "Jane Doe",
  contact_phone: "(613) 722-8019",

  address: {
    street: "30 Rosemount Ave #2",
    postal_code: "K1Y 1P4",
    city: "Ottawa",
    province: "Ontario",
    country: "Canada",
  },

  items: [
    { id: "1", quantity: 1 },
    { id: "11", quantity: 2 },
    { id: "2", quantity: 1 },
    { id: "3", quantity: 2 },
    { id: "4", quantity: 3 },
    { id: "5", quantity: 2 },
    { id: "6", quantity: 1 },
    { id: "7", quantity: 1 },
    { id: "8", quantity: 1 },
    { id: "9", quantity: 1 },
    { id: "10", quantity: 4 },
  ],
};

let fridgeB = {
  id: "fg-2",
  name: "Morrison fridge",
  num_items_accepted: 50,
  can_accept_items: 20,
  accepted_types: ["dairy", "produce"],
  contact_person: "John Doe",
  contact_phone: "(613) 596-6229",

  address: {
    street: "3985-A Morrison Drive",
    postal_code: "K2H 7L1",
    city: "Ottawa",
    province: "Ontario",
    country: "Canada",
  },

  items: [
    { id: "1", quantity: 1 },
    { id: "11", quantity: 2 },
    { id: "2", quantity: 1 },
    { id: "3", quantity: 2 },
    { id: "4" },
    { id: "5", quantity: 2 },
    { id: "6", quantity: 1 },
    { id: "7", quantity: 1 },
    { id: "8", quantity: 1 },
    { id: "9", quantity: 1 },
    { id: "10", quantity: 4 },
  ],
};

let fridgeC = {
  id: "fg-3",
  name: "Somerset fridge",
  num_items_accepted: 40,
  can_accept_items: 20,
  accepted_types: ["dairy", "pantry"],
  contact_person: "Mary Doe",
  contact_phone: "(613) 238-8210",

  address: {
    street: "55 Eccles street",
    postal_code: "K1R 6S3",
    city: "Ottawa",
    province: "Ontario",
    country: "Canada",
  },

  items: [
    { id: "1", quantity: 1 },
    { id: "11", quantity: 2 },
    { id: "2", quantity: 1 },
    { id: "3", quantity: 2 },
    { id: "4" },
    { id: "5", quantity: 2 },
    { id: "6", quantity: 1 },
    { id: "7", quantity: 1 },
    { id: "8", quantity: 1 },
    { id: "9", quantity: 1 },
    { id: "10", quantity: 4 },
  ],
};

let fridges = [fridgeA, fridgeB, fridgeC];
