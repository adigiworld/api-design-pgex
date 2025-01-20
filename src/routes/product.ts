import { Router } from "express";

const product = Router();
/**
 * Product
 */
product.route("/product").get((req, res) => {
  res.status(200).json({ status: "OK" });
});
product.route("/product/:id").get((req, res) => {

});
product.route("/product/:id").put((req, res) => {

});
product.route("/product").post((req, res) => {

});
product.route("/product:id").delete((req, res) => {

});

/**
  * Update
  */
product.route("/update").get((req, res) => {

});
product.route("/update/:id").get((req, res) => {

});
product.route("/update/:id").put((req, res) => {

});
product.route("/update").post((req, res) => {

});
product.route("/update:id").delete((req, res) => {

});
export { product };
