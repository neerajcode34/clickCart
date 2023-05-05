const router = require("express").Router();

const stripe = require("stripe")("sk_test_51MzfAQSB0mjsjH9xcF7gw22p9K3k25BJXtss1f6n1iwzFSTMYZ998br1YhLOXJRhSU3gjDoKflDxPrW1Kbh2miyV00VjOJV8qB");


router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;