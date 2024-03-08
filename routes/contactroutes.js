const express=require("express");
const router=express.Router();
const {getcontact}=require("../controllers/contactcontroller");
const {postcontact}=require("../controllers/contactcontroller");
const {getcontactid}=require("../controllers/contactcontroller");
const {deletecontactid}=require("../controllers/contactcontroller");
const {updtaecontactid}=require("../controllers/contactcontroller");
const validateToken = require("../middleware/validate");

router.use(validateToken);
router.route("/" ).get(getcontact);

router.route("/" ).post(postcontact);

router.route("/:id" ).put(updtaecontactid);

router.route("/:id" ).delete(deletecontactid);


router.route("/:id" ).get(getcontactid)

module.exports=router;