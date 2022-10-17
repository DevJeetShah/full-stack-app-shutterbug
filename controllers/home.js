
const Profile = require("../models/Profile");
const Review = require("../models/Review");


module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getWelcome: async (req, res) => {

    try {
      const profile = await Profile.findOne({user: req.user.id });
      console.log(profile)
      res.render("welcome.ejs", { profile: profile, user: req.user });

    } catch (err) {
      console.log(err);
    }

/*     try {
      let allprofiles = await Profile.find()
      const profiles = allprofiles.filter(el => el.user === req.user.id)
      const profile = await Profile.find({user: req.user.id });
      console.log(profiles)
      console.log(profile)
      res.render("welcome.ejs", { profiles: profiles, profile: profile, user: req.user });

    } catch (err) {
      console.log(err);
    } */
  },

  getSearchResults: async (req, res) => {



    try {
      const profiles = await Profile.find({location: req.body.location.toLowerCase()});
      


      
/*     for(let i=0; i<profiles.length; i++){

      const reviews = await Review.find({profileLocation: req.body.location, profileId: profiles[i]._id})
      console.log(reviews)

    }
   
   */
/*       var totalratings = []
      for(let i=0; i<reviews.length; i++){
        totalratings.push(reviews[i].rating)
      }
      
      let average = (totalratings.reduce((a,b) => a+b, 0)/reviews.length).toFixed(1)
      console.log(average)
 */




      console.log(profiles)

        if(profiles.length > 0) {
          // do something if there are results
          res.render("searchresults.ejs", { profiles: profiles, user: req.user });
        } else {

          // do something else if there are no results
          res.render("searchresults.ejs", { profiles: profiles, user: req.user });
        }
    
/*       res.render("searchresults.ejs", { profiles: profiles, user: req.user}); */

    } catch (err) {
      console.log(err);
    }

  },

  // for that profile, get all reviews
  

  getSearchFilter: async (req, res) => {


    try {
      let profilesFree = [];
      let profilesPaid = []
      let profilesCollaboration = [];
      let profilesMentorship = [];



      if(req.body.free) {
        profilesFree = await Profile.find({
          location: req.params.id,
          offerings: {$regex: 'free photoshoot'}
        });
      }
      if(req.body.paid) {
        profilesPaid = await Profile.find({
          location: req.params.id,
          offerings: {$regex: 'paid photoshoot'},
        });
      }


      if(req.body.collaboration) {
        profilesCollaboration = await Profile.find({
          location: req.params.id,
          offerings: {$regex: 'collaboration'}
        });
      }
      if(req.body.mentorship) {
        profilesMentorship = await Profile.find({
          location: req.params.id,
          offerings: {$regex: 'mentorship'}
        });

      }
      let duplicateprofiles = profilesFree.concat(profilesPaid).concat(profilesCollaboration).concat(profilesMentorship);


      const profiles = duplicateprofiles.reduce((unique, o) => {
    
        if(!unique.some(obj => obj.user.toString() === o.user.toString())) {
          unique.push(o);
        }
        return unique;
    },[]);



      if(profiles.length > 0) {
        // do something if there are results
        res.render("searchresults.ejs", { profiles: profiles, user: req.user });
      } else {
        // do something else if there are no results
      }
  

    } catch (err) {
      console.log(err);
    }


  }

};










  