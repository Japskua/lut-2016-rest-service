/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var request = require('superagent');

/* GET match for students with companies. */
router.get('/studentsWithCompanies', function(req, res, next) {
    // Get the query
    var fieldQuery = req.query.field;

    request
    .get("localhost:3000/api/search/students?major=" + fieldQuery)
    .end(function(err, studentsRes) {
        if(err) {
            throw err;
        } else {
            var foundStudents = studentsRes.body;

            // Now, find companies looking for such work
            request
            .get("localhost:3000/api/search/companies?business=" + fieldQuery)
            .end(function(companiesErr, companiesRes) {
                if(companiesErr) {
                    throw err;
                } else {
                    var foundCompanies = companiesRes.body;
                    res.json({ foundStudents : foundStudents, foundJobs : foundCompanies});
                }
            });
        }
    });
});


module.exports = router;