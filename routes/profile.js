const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const profileController = require("../controllers/profiles");


router.get("/:id", ensureAuth, profileController.getUserProfile);

router.post("/createProfileReview/:id", ensureAuth, profileController.createProfileReview)


router.get("/", ensureAuth, profileController.getProfile)

router.put("/updateProfile/:id", upload.single("file"), profileController.updateProfile)


router.post("/createProfile", upload.single("file"), profileController.createProfile);



module.exports = router;
