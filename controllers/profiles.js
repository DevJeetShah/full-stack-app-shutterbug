const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const validator = require("validator");


module.exports = {

  createProfile: async (req, res) => {


    try {



              const validationErrors = [];

              if (!validator.isLength(req.body.firstName, { min: 1 })){
              validationErrors.push({ msg: "First Name cannot be blank." });
              }
              if (!validator.isLength(req.body.location, { min: 1 })){
                  validationErrors.push({ msg: "Location Name cannot be blank." });
                  }
              if (!validator.isLength(req.body.contact, { min: 1 })){
                    validationErrors.push({ msg: "Contact cannot be blank." });
                  }
          
              console.log(validationErrors)
          
              if (validationErrors.length) {
                req.flash("errors", validationErrors);
                return res.redirect("/profile");
              }
          
            if(!req.file){


              await Profile.create({
                firstname: req.body.firstName,
                lastname: req.body.lastName,


                location: req.body.location.toLowerCase(),
                offerings: req.body.offerings,
                contact: req.body.contact,
                bio: req.body.bio,
                reviews: [],
                user: req.user.id,
              });
              console.log("Profile has been added!");
              res.redirect("/search");
            } 
            
            else
            
            {
              // Upload image to cloudinary
              console.log(req.file)

              const result = await cloudinary.uploader.upload(req.file.path);

              await Profile.create({
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                location: req.body.location.toLowerCase(),
                offerings: req.body.offerings,
                contact: req.body.contact,
                bio: req.body.bio,
                reviews: [],
                user: req.user.id,
              });
              console.log("Profile has been added!");
              res.redirect("/search");
            }
      }
      catch (err) {
        console.log(err);
      }

  },

  getProfile: async (req, res) => {
    
/*         try {
          const profile = await Profile.find({user: req.user.id });
          res.render("profile.ejs", { profile: profile, user: req.user });
        } catch (err) {
          console.log(err);
        } */
    
        try {
          const profile = await Profile.findOne({user: req.user.id });
          res.render("profile.ejs", { profile: profile, user: req.user });
        } catch (err) {
          console.log(err);
        }
    
/*         try {
          let allprofiles = await Profile.find()
          const profiles = allprofiles.filter(el => el.user === req.user.id)
          const profile = await Profile.find({user: req.user.id });
          console.log(profiles)
          console.log(profile)
          res.render("profile.ejs", { profiles: profiles, profile: profile, user: req.user });
    
        } catch (err) {
          console.log(err);
        } */
      },



  updateProfile: async (req, res) => {
    try {
      const validationErrors = [];

      if (!validator.isLength(req.body.firstName, { min: 1 })){
      validationErrors.push({ msg: "First Name cannot be blank." });
      }
        if (!validator.isLength(req.body.location, { min: 1 })){
          validationErrors.push({ msg: "Location Name cannot be blank." });
          }
        if (!validator.isLength(req.body.contact, { min: 1 })){
            validationErrors.push({ msg: "Contact cannot be blank." });
          }

      console.log(validationErrors)

      if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/profile");
      }

    
      
            if(!req.file){

              await Profile.findOneAndUpdate(
                { _id: req.params.id },
                {
                  firstname: req.body.firstName,
                  lastname: req.body.lastName,

                  location: req.body.location.toLowerCase(),
                  offerings: req.body.offerings,
                  contact: req.body.contact,
                  bio: req.body.bio,
                }
              );
              console.log("profile updated!");
              res.redirect(`/profile/${req.params.id}`);
            }
            else {
              const result = await cloudinary.uploader.upload(req.file.path);
              
              await Profile.findOneAndUpdate(
                { _id: req.params.id },
                {
                  firstname: req.body.firstName,
                  lastname: req.body.lastName,
                  image: result.secure_url,
                  cloudinaryId: result.public_id,
                  location: req.body.location.toLowerCase(),
                  offerings: req.body.offerings,
                  contact: req.body.contact,
                  bio: req.body.bio,
                }
              );
              console.log("profile updated!");
              res.redirect(`/profile/${req.params.id}`);
              } 
      }  

     catch (err) {
      console.log(err);
     }
  },







   getUserProfile: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      const reviews = await Review.find({profileId: req.params.id}).sort({ createdAt: "desc" }).lean();
      const totalReviews = await Review.countDocuments({profileId: req.params.id})

      var totalratings = []
      for(let i=0; i<reviews.length; i++){
        totalratings.push(reviews[i].rating)
      }
      
      let average = (totalratings.reduce((a,b) => a+b, 0)/reviews.length).toFixed(1)
      

      res.render("userprofile.ejs", { profile: profile, user: req.user, reviews: reviews, totalReviews: totalReviews, average: average });
      console.log(profile)
      console.log(reviews)
      console.log(totalReviews)
      console.log(average)
      console.log(typeof reviews[0].rating)
    } catch (err) {
      console.log(err);
    }
  },

    createProfileReview: async (req, res) => {
      try{
        const revProfile = await Profile.findOne({user: req.user.id});
        const profile = await Profile.findById(req.params.id)
        

        await Review.create({

          review: req.body.review,
          rating: req.body.rating,
          profileId: req.params.id,
          userId: req.user.id,
          revFirstName: revProfile.firstname,
          revLastName: revProfile.lastname,
          profileLocation: profile.location

        });
        console.log("review and rating has been added!");
        res.redirect("/profile/"+req.params.id);
      } catch (err) {
        console.log(err);
      }
}
};
