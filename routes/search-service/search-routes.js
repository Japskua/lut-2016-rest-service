/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var request = require('superagent');

var httpOptions = {
    hostname : "localhost",
    port : "3000",
    path : "/api/jobs",
    agent : false
};


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

                res.json({ results : filteredJobs});
            }
        });

    /*

    http.get(httpOptions, function(results) {
        console.log(results);

        res.json({ query : fieldQuery});
    });*/

    // Now, get all the JOBS from the JOBS API

    /*
    // Just get the list of title, field
    var listAll = [];
    _.forEach(jobs, function(job) {
        listAll.push({
            id : job.id,
            title : job.title,
            field : job.field
        });
    });
    res.json(listAll);*/
});

/* GET the job in question */
router.get('/:jobId', function(req, res, next) {
    var jobId = req.params.jobId;
    if(!jobId) {
        res.status(500).send({error : "Missing jobId ID!"});
        return;
    }

    var matchedJob = _.find(jobs, { "id" : jobId});
    if(!matchedJob) {
        res.status(500).send({error : "No matching job found with the given id: " + jobId});
    } else {
        res.json(matchedJob);
    }
});

module.exports = router;