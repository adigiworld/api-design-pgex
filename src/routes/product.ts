import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/midway";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../handlers/product";
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from "../handlers/update";

const product = Router();
/**
 * Product
 */
product.route("/product").get(getProducts);
product.route("/product").post(body("name").isString(), handleInputErrors, createProduct);
product.route("/product/:id").get(getProduct);
product.route("/product/:id").put(body("name").isString(), handleInputErrors, updateProduct);
product.route("/product/:id").delete(deleteProduct);

/**
  * Update
  */
product.route("/update").get(getUpdates);
product.route("/update").post(body("title").exists().isString(),
  body("status").isIn(["AVAILABLE", "UNAVAILABLE", "SHIPPED", "IN_PROGRESS"]),
  body("productId").exists().isString(), createUpdate);
product.route("/update/:id").get(getUpdate);
product.route("/update:id").delete(deleteUpdate);
product.route("/update/:id").put(
  body("title").optional(), body("status").isIn(["AVAILABLE", "UNAVAILABLE", "SHIPPED", "IN_PROGRESS"]), updateUpdate);
export { product };
