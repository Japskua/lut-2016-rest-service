/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var request = require('superagent');

/* GET query for jobs. */
router.get('/jobs', function(req, res, next) {
    // Get the query
    var fieldQuery = req.query.field;

    request
        .get("localhost:3000/api/jobs")
        .end(function(err, results) {
            if(err) {
                throw err;
            } else {
                var allJobs = results.body;

                // Filter the jobs
                var filteredJobs = _.filter(allJobs, { "field" : fieldQuery});

                res.json({ filteredJobs : filteredJobs});
            }
        });
});

/* GET the student with search in question */
router.get('/students', function(req, res, next) {
    // Get the query
    var major = req.query.major;
    var year = req.query.year;
    var lookingFor = decodeURI(req.query.lookingFor);

    console.log("lookingFor is:", lookingFor);

    request
        .get("localhost:3000/api/students")
        .end(function(err, results) {
            if(err) {
                throw err;
            } else {
                var students = results.body;

                // Filter the jobs
                if(!_.isEmpty(major)) {
                    students = _.filter(students, { "major" : major});
                }
                if(!_.isEmpty(year)) {
                    students = _.filter(students, { "year" : year});
                }
                if(!_.isEmpty(year)) {
                    students = _.filter(students, function(student) {
                        return _.includes(student.lookingFor, lookingFor);
                    });
                }

                res.json({ filteredStudents : students});
            }
        });
});


/* GET the company with search in question */
router.get('/companies', function(req, res, next) {
    // Get the query
    var business = req.query.business;

    request
        .get("localhost:3000/api/companies")
        .end(function(err, results) {
            if(err) {
                throw err;
            } else {
                var companies = results.body;

                // Filter the jobs
                if(!_.isEmpty(business)) {
                    companies = _.filter(companies, { "business" : business});
                }

                res.json({ filteredCompanies : companies});
            }
        });
});

module.exports = router;