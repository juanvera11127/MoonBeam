const listing = require('../models/listing');

exports.getListings = (req,res) => {

        //use mongoose to get all listing in the database
        listing.find( (err, listing) => {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.json(err);
        
            res.json(listing); // return all listings in JSON format
        })

};

exports.addListing = (req,res) => {
    //console.log("bazinga, A new listing has been added");
    const body = req.body;
    const listingObject = new listing(body);
    console.log(body);
    listingObject.save()
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                })
}

exports.getListing = (req,res) => {
    const {id} = req.params;
    listing.findById(id)
        .then(listing => {
            res.json(listing);
        })
        .catch(err => {
            res.json(err);
        });
}