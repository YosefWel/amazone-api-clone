const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Sucesss!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    })
    res.status(201).json({
      client_secret: paymentIntent.client_secret,
    })
  } else {
    res.status(404).json({
      message: "the total amount should have greater than 0",
    })
  }
})
app.listen(5000, (err) => {
  if (err) throw err;
  else console.log("it is running");
});
