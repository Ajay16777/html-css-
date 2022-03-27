const express = require("express");
const router = express.Router();
const fridges = require("../public/js/comm-fridge-data.json");
const fs = require("fs");


// assign a unique id to each new fridge.
// check the existing fridges and create a new id that’s unique.
const newId = () => {
  //    "id": "fg-1"
  let id = "fg-";
  let count = 1;
  for (let i = 0; i < fridges.length; i++) {
    if (fridges[i].id === id + count) {
      count++;
    }
  }
  return id + count;
};

const writeFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
};

//GET request with the URL / or /index.html
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "../public" });
});

//GET request with the URL /index.html
router.get("/index.html", (req, res) => {
  res.sendFile("index.html", { root: "../public" });
});

//GET request with the URL /fridges
router.get("/fridges", async (req, res) => {
  //if content-type is application/json
  if (req.headers["content-type"] === "application/json") {
    res.json(fridges);
  } else {
    res.sendFile("view_pickup.html", { root: "../public" });
  }
});

//GET request with the URL /fridges/addFridge
router.get("/fridges/addFridge", (req, res) => {
  //send add_fridge.html
  res.sendFile("addFridge.html", { root: "../public" });
});

//POST request with the URL /fridges
router.post("/fridges", (req, res) => {
  const newFridge = {
    name: req.body.name,
    can_accept_items: req.body.can_accept_items,
    accepted_types: [req.body.accepted_types[0], req.body.accepted_types[1]],
    contact_person: req.body.contact_person,
    contact_phone: req.body.contact_phone,
    address: {
      street: req.body.street,
      postal_code: req.body.postal_code,
      city: req.body.city,
      province: req.body.province,
    },
  };
  //check all the fields are filled
  if (
    newFridge.name &&
    newFridge.can_accept_items &&
    newFridge.accepted_types &&
    newFridge.contact_person &&
    newFridge.contact_phone &&
    newFridge.address.street &&
    newFridge.address.postal_code &&
    newFridge.address.city &&
    newFridge.address.province
  ) {
    newFridge.id = newId();
    //set the "num_items_accepted" field to 0 since the fridge hasn’t yet accepted any items.
    newFridge.num_items_accepted = 0;
    //default set the country to “Canada”,
    newFridge.address.country = "Canada";
    //add the new fridge to the list of fridges
    fridges.push(newFridge);
    //write the new list of fridges to the file
    writeFile("./public/js/comm-fridge-data.json", JSON.stringify(fridges));
    //send a success message to the client
    res.send("Fridge added successfully!");
  } else {
    res.send("Please fill in all the fields!");
  }
});

// GET request with the parameterized URL /fridges:/fridgeID
router.get("/fridges/:fridgeID", (req, res) => {
  //send json data to the client
  res.json(fridges.find((fridge) => fridge.id === req.params.fridgeID));
});

// Show the “Edit a fridge” webpage on /fridges/editFridge
router.get("/fridges/editFridge", (req, res) => {
  res.sendFile("editFridge.html", { root: "../public" });
});

// Update information about a fridge `/fridges/:fridgeID`
router.put("/fridges/:fridgeID", (req, res) => {
  const fridge = fridges.find((fridge) => fridge.id === req.params.fridgeID);
  if (fridge) {
    fridge.name = req.body.name;
    fridge.can_accept_items = req.body.can_accept_items;
    fridge.accepted_types = [
      req.body.accepted_types[0],
      req.body.accepted_types[1],
    ];
    fridge.contact_person = req.body.contact_person;
    fridge.contact_phone = req.body.contact_phone;
    fridge.address.street = req.body.street;
    fridge.address.postal_code = req.body.postal_code;
    fridge.address.city = req.body.city;
    fridge.address.province = req.body.province;
    fridge.address.country = "Canada";
    writeFile("./public/js/comm-fridge-data.json", JSON.stringify(fridges));
    res.send("Fridge updated successfully!");
  } else {
    res.send("Fridge not found!");
  }
});

//Add an item in the fridge on /fridges/:fridgeID/items
router.post("/fridges/:fridgeID/items", (req, res) => {
  const fridge = fridges.find((fridge) => fridge.id === req.params.fridgeID);
  if (fridge) {
    const newItem = {
      // {"id": value, "quantity": value}
      id: req.body.id,
      quantity: req.body.quantity,
    };
    fridge.items.push(newItem);
    writeFile("./public/js/comm-fridge-data.json", JSON.stringify(fridges));
    res.send("Item added successfully!");
  } else {
    res.send("Fridge not found!");
  }
});

//Delete an item in the fridge on /fridges/:fridgeID/items/:itemID
router.delete("/fridges/:fridgeID/items/:itemID", (req, res) => {
  const fridge = fridges.find((fridge) => fridge.id === req.params.fridgeID);
  if (fridge) {
    const item = fridge.items.find((item) => item.id === req.params.itemID);
    if (item) {
      fridge.items = fridge.items.filter(
        (item) => item.id !== req.params.itemID
      );
      writeFile("./public/js/comm-fridge-data.json", JSON.stringify(fridges));
      res.send("Item deleted successfully!");
    } else {
      res.send("Item not found!");
    }
  } else {
    res.send("Fridge not found!");
  }
});

//Delete a fridge items on /fridges/:fridgeID/items/?itemId1&itemId2
router.delete("/fridges/:fridgeID/items/?*", (req, res) => {
  const fridge = fridges.find((fridge) => fridge.id === req.params.fridgeID);
  if (fridge) {
    const itemIds = req.query;
    fridge.items = fridge.items.filter((item) => !itemIds.includes(item.id));
    writeFile("./public/js/comm-fridge-data.json", JSON.stringify(fridges));
    res.send("Items deleted successfully!");
  } else {
    res.send("Fridge not found!");
  }
});

module.exports = router;
