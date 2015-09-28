/**
 * Created by PeskoM on 17/09/2015.
 */
var request = require("request");
var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    //apiOptions.server = "link to production URL"; trenutno ne rabim
}

var renderHomepage = function (req, res) {

    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
            pageHeader:
        {
            title: 'Loc8r',
                strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. " +
        "Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    });
};


    //var message;
    //if (!(responseBody instanceof Array)) {
    //    message = "API lookup error";
    //    responseBody = [];
    //} else {
    //    if (!responseBody.length) {
    //        message = "No places found nearby";
    //    }
    //}
    //res.render('locations-list', {
    //    title: 'Loc8r - find a place to work with wifi',
    //    pageHeader: {
    //        title: 'Loc8r',
    //        strapline: 'Find places to work with wifi near you!'
    //    },
    //    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. " +
    //    "Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    //    locations: responseBody,
    //    message: message



        //locations: [{
        //  name: 'Starcups',
        //  address: '125 High Street, Reading, RG6 1PS',
        //  rating: 3,
        //  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        //  distance: '100m'
        //}, {
        //  name: 'Cafe Hero',
        //  address: '125 High Street, Reading, RG6 1PS',
        //  rating: 4,
        //  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        //  distance: '200m'
        //}, {
        //  name: 'e-Tosnjak',
        //  address: 'Krneki, Lepega, 1000 LJ',
        //  rating: 5,
        //  facilities: ['e-bike', 'scooter', 'Premium crap'],
        //  distance: '700m'
        //},
        //  {
        //    name: 'Burger Queen',
        //    address: '125 High Street, Reading, RG6 1PS',
        //    rating: 2,
        //    facilities: ['Food', 'Premium wifi'],
        //    distance: '250m'
        //  },
        //  {
        //    name: 'Andreja Abina',
        //    address: 'Celovška 87 Street, 1000 Slovenia',
        //    rating: 5,
        //    facilities: ['Food', 'Sex', 'Pleasure'],
        //    distance: '50cm'
        //  }]
//    });
//};

/* GET 'home' page */
module.exports.homeList = function (req, res) {
    renderHomepage(req, res);

    //var requestOptions, path;
    //path = '/api/locations';
    //requestOptions = {
    //    url: apiOptions.server + path,
    //    method: "GET",
    //    json: {},
    //    qs: {
    //        lng: -0.969078,
    //        lat: 51.455031,
    //        maxDistance: 20000000000000000000000000000
    //    }
    //};
    //request(requestOptions, function (err, response, body) {
    //        var i, data;
    //        data = body;
    //        if (response.statusCode === 200 && data.length) {
    //            for (i = 0; i < data.length; i++) {
    //                data[i].distance = _formatDistance(data[i].distance);
    //            }
    //            renderHomepage(req, res, body);
    //        } else {
    //            _showError(req, res, response.statusCode);
    //        }
    //
    //    }
    //);
};

var formatDistance = function () {
    return function(distance) {
        var numDistance, unit;
        if (distance > 1) {
            numDistance = parseFloat(distance).toFixed(1);
            unit = 'km';
        } else {
            numDistance = parseInt(distance * 1000, 10);
            unit = 'm';
        }
        return numDistance + unit;
    };
};

var renderDetailPage = function (req, res, locDetail) {
    res.render('location-info', {
        title: locDetail.name,
        //title: 'Starcups',
        pageHeader: {title: locDetail.name},
        //pageHeader: {title: 'Starcups'},
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
        //location: {
        //  name: 'Starcups',
        //  address: '125 High Street, Reading, RG6 1PS',
        //  rating: 3,
        //  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        //  coords: {lat: 51.455041, lng: -0.9690884},
        //  openingTimes: [{
        //    days: 'Monday - Friday',
        //    opening: '7:00am',
        //    closing: '7:00pm',
        //    closed: false
        //  }, {
        //    days: 'Saturday',
        //    opening: '8:00am',
        //    closing: '5:00pm',
        //    closed: false
        //  }, {
        //    days: 'Sunday',
        //    closed: true
        //  }],
        //  reviews: [{
        //    author: 'Simon Holmes',
        //    rating: 5,
        //    timestamp: '16 July 2013',
        //    reviewText: 'What a great place. I can\'t say enough good things about it.'
        //  }, {
        //    author: 'Charlie Chaplin',
        //    rating: 3,
        //    timestamp: '16 June 2013',
        //    reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
        //  }]
        //}
    });
};

var getLocationInfo = function (req, res, callback) {
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
}

/* GET 'Location info' page */
module.exports.locationInfo = function (req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};

var renderReviewForm = function (req, res, locDetail) {
    console.log("++++++tole se je izvedlo");
    res.render('location-review-form', {
        title: 'Review ' + locDetail.name + ' on Loc8r',
        pageHeader: {title: 'Review ' + locDetail.name},
        user: {
            displayName: "Simon Holmes"
        },
        error: req.query.err
    });
};

/* GET 'Add review' page */
module.exports.addReview = function (req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
};

module.exports.doAddReview = function (req, res) {
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = "/api/locations/" + locationid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/review/new?err=val');
    } else {
      request(requestOptions, function (err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
          res.redirect('/location/' + locationid + '/review/new?err=val');
        } else {
          _showError(req, res, response.statusCode);
        }
      });
    }
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong."
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};