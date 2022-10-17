const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

/* const welcomeController = require("../controllers/welcome.js") */
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/search", ensureAuth, homeController.getWelcome);
router.post("/searchResults", ensureAuth, homeController.getSearchResults);
router.post("/searchFilter/:id", ensureAuth, homeController.getSearchFilter);



router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
