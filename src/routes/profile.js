const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         emailId:
 *           type: string
 * 
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 * 
 * /profile/view:
 *   get:
 *     summary: Get user profile details
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 * 
 * /profile/edit:
 *   patch:
 *     summary: Edit user profile
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

//Reading user details

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json(user); 
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});

// edit profile data

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        } else {
            const loggedInUser = req.user;

            //patching request data in loggedInUserData
            Object.keys(req.body).forEach(key=> (loggedInUser[key] = req.body[key]));

            //saving in DB
            await loggedInUser.save();
            
            //res.send(`${loggedInUser.firstName}, your profile is Updated !!`);
            res.json({ message : `${loggedInUser.firstName}, your profile is Updated !!` , data : loggedInUser});
        }


    } catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

//forgot password

profileRouter.patch("/profile/password", async(req,res)=>{
   //it will take existing and new password,
});



module.exports = profileRouter;