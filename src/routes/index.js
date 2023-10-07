const { Router } = require("express");
const router = Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const jsonProducts = fs.readFileSync("src/data.json", "utf-8");
let products = JSON.parse(jsonProducts);
router.get("/", (req, res) =>
  res.render("index.ejs", {
    products,
  })
); //index.ejs

router.get("/newProduct", (req, res) =>
  res.render("newProduct", { title: "Nuevo dato" })
);

router.post("/newProduct", (req, res) => {
  const { id, name, price, description, image } = req.body;
  let newProduct = {
    id: uuidv4(),
    name,
    price,
    description,
    image,
  };
  products.push(newProduct);

  const jsonProducts = JSON.stringify(products);
  fs.writeFileSync("src/data.json", jsonProducts, "utf-8");

  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  products = products.filter((prod) => prod.id != req.params.id);
  const jsonProducts = JSON.stringify(products);
  fs.writeFileSync("src/data.json", jsonProducts, "utf-8");
  res.redirect("/");
});

router.get("/updateProduct/:id", (req, res) => {
  let product = products.filter((prod) => prod.id == req.params.id);
  res.render("updateProduct", {
    product,
  });
});

router.post("/updateProduct", (req, res) => {
  const { id, name, price, description, image } = req.body;
  let newProduct = {
    id,
    name,
    price,
    description,
    image,
  };

  // borrar el dato del JSON
  products = products.filter((prod) => prod.id != id);

  // agregar los datos modificados al JSON
  products.push(newProduct);

  let jsonProducts = JSON.stringify(products);
  fs.writeFileSync("src/data.json", jsonProducts, "utf-8");

  res.redirect("/");
});

module.exports = router;
