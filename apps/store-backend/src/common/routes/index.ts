import express, { type Router } from "express";
import authRouter from "@/features/auth/auth.route";
import cartRouter from "@/features/cart/cart.route";
import categoryRouter from "@/features/category/category.route";
import orderRouter from "@/features/order/order.route";
import productRouter from "@/features/product/product.route";
import userRouter from "@/features/user/user.route";
import wishlistRouter from "@/features/wishlist/wishlist.route";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);
router.use("/carts", cartRouter);
router.use("/wishlists", wishlistRouter);

export default router;

