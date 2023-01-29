# Shutterbug App
Shutterbug is a full stack web application for photography enthusiasts to find and meet other photographers in the area

Live site: https://shutterbug.cyclic.app/

Demo Account Credentials:
email: demotest@test.com
password: demotest

![](public/images/shuttergif1.gif)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Bootstrap, MongoDB, Express, EJS, Passport and Nodejs

The idea to build this app came from a personal experience of struggling to not just find an affordable photographer, but also find people who just wants to go out, take each other's pictures with their camera, all while not having to spend money for it.

The actual building of the app started off with this list of things I would have wanted a user to be able to do:

1. Sign up as a new user with email and password credentials
2. Log In as a new or an existing user with email and password credentials
3. Log out as a new or an existing user
4. Create a new profile with the abilility upload a pic
5. Edit an existing profile
6. Search for users based off location
7. Filter search results based on certain profile information of the the user
8. Leave a review on a user's profile

After this, I drew a wireframe drawing of this app based on the MVP architecture. It allowed me to get a general idea of how many models(User, Profile, Reviews) would be required for the app to do its function. So when the requests are made to the server from the client side, I would know excatly what model to reference to pull specific data from the MongoDB through the Mongoose schema.  

I used passport for authentication, and EJS as a templating language to render the javscript functionality and spit out html to the client.

I finished off the project with a touch of bootstrap and custom css for styling. 


## Optimizations

1. Initially, I had only included a user's ability to leave a review, and it felt like it was missing something. So not only I added a user's ability to be able to rate a review, but also be able to view the total amount of reviews and average rating on any user's profile. And the fun part of creating a rating functionality was that, through some creativity, I came up with the idea of using a font awesome stars class but in a for loop, and styling them all inline. The result was yellow stars all aligning next to each other.

2. Included a drop down accordion for the seach filter functionality for mobile and tablet screen resolution to make the UI look clean, easy to use and beautiful.

## Lessons Learned:

1. I learned that the wireframe made it intuitive for me to create routes for every request made and controllers to route those requests as applicable.

2. Doing repeated codewars challenges everyday allowed me to have enough self awareness of the arrays and string methods, that it successfully allowed me to turn my functionality ideas into reality in this project.

