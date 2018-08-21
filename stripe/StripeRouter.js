const express = require("express");
const router = express.Router();
const passport = require("passport");
require('dotenv').config()
const stripe = require("stripe")(process.env.SECRET_KEY);

const User = require("../user/UserModel");

/*
    @route  GET pay
    @desc   Renders initial page
    @access Public (Testing) | Private (Production)
*/
router.get("/", (req, res) => {
  res.render("index", {});
});

/*
    @route  GET pay/paid
    @desc   Displays successful subscription page
    @access Public (Testing) | Private (Production)
*/
router.get("/paid", (req, res) => {
  res.render("success", {});
});

/*
    @route  POST pay/monthly
    @desc   Allows user to subscribe to a monthly plan
    @access Private (Production)
*/
router.post(
  "/monthly",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.user;

    User.findOne({ email })
      .then(user => {
        if (user.membership) res.status(400).json("You're already a member!");
        else {
          stripe.customers.create(
            {
              email: email,
              source: "tok_visa"
            },
            (err, customer) => {
              if (err) res.status(400).json("Unable to create a user");
              else {
                const { id } = customer;
                stripe.subscriptions.create(
                  {
                    customer: id,
                    items: [
                      {
                        plan: "Monthly"
                      }
                    ]
                  },
                  (err, subscription) => {
                    if (err) res.status(400).json("Unable to subscribe");
                    else {
                      user.subscription = subscription.id;
                      // user.membership = true;
                      user.save();
                      res.redirect("paid");
                    }
                  }
                );
              }
            }
          );
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;