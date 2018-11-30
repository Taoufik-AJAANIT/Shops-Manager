# SHopsManager

Real Time  based application shows nearby shops by getting user's position &  calculating the distance to the shop .


### Prerequisites

 you need to install nodejs 

## Structure

* Front end on client folder .
* BAck end on API folder .

### Installing

```
git clone https://github.com/Taoufik-AJAANIT/Shops-Manager.git
```

```
cd Shops-Manager
```

* To install server : 
```
npm install --prefix API
```

* To install client : 
```
npm install --prefix client
```

* to run server : 
```
npm run server --prefix API
```

* To run client :
```
npm start --prefix client
```


## Built With

* [Node.js] - For using JS outside the navigator & for backend developement
* [Express.js] - NodeJS framework
* [React.js] - Fronend JS framework
* [MongoDb] - noSQL database

## Features

* Front end Validation .
* Front end Validation .
* Backend Validation .
* JWT based Authontication .
* Passwords encryption .
* Database hosted on MongoAtlas .
* Routes Protection .
* Routes & Coontrollers .
* No page refreshs .
* giving rondom coordinates to user every refresh considering that user is moving (for now) .
* user (after authontication) can display the list of shops sorted by distance .
* user (after authontication)  can like a shop, so it can be added to his preferred shops .
* user (after authontication)  can display the list of preferred shop .
* user (after authontication)  can remove a shop from his preferred shops list .
* Will be added and much more .. :  user (after authontication)  can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours (Dislike Button not working now :)

## Authors

* **Taoufik AJAANIt**  *

## License

This project is licensed under the MIT License .
