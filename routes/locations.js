/**
 * Created by PeskoM on 16/09/2015.
 */
var ctrl = require('../app_server/controllers/locations');
module.exports = function(app){
    app.get('/', ctrl.homeList);
    app.get('/location/:locationid', ctrl.locationInfo);
    app.get('/location/review/new', ctrl.addReview);
};