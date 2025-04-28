("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products: cartProducts } = ctx.request.body;

    console.log("Incoming cart products:", cartProducts);

    if (!cartProducts || !Array.isArray(cartProducts)) {
      ctx.response.status = 400;
      return { error: "Invalid products data" };
    }

    try {
      // Get ALL products first - now properly accessing results
      const { results: allProducts } = await strapi
        .service("api::product.product")
        .find({ populate: "*" });

      console.log("All products in database:", allProducts);

      const lineItems = await Promise.all(
        cartProducts.map((cartProduct) => {
          // Find matching product in database
          const dbProduct = allProducts.find((p) => p.id === cartProduct.id);

          if (!dbProduct) {
            console.error(`Product ${cartProduct.id} not found in database`);
            throw new Error(`Product ${cartProduct.id} not found`);
          }

          if (!dbProduct.title || !dbProduct.price) {
            console.error(`Product ${cartProduct.id} missing required fields`);
            throw new Error(`Product data incomplete for ${cartProduct.id}`);
          }

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: dbProduct.title,
              },
              unit_amount: Math.round(dbProduct.price * 100),
            },
            quantity: cartProduct.quantity,
          };
        })
      );

      console.log("Generated lineItems:", lineItems);

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success?payment=success`, // Changed parameter
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
      });

      await strapi.service("api::order.order").create({
        data: {
          products: cartProducts,
          stripeId: session.id,
          status: "pending",
        },
      });

      return { stripeSession: session };
    } catch (error) {
      console.error("Order Create Error:", error);
      ctx.response.status = 500;
      return {
        error: "Checkout failed",
        details: error.message,
        suggestion: "Verify products exist in your database",
      };
    }
  },
}));
