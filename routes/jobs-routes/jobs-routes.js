/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var jobs = [
    {
        id : "1",
        title : "Awesome Cod3r",
        description : "Looking for an awesome coder. Too l4zy to 4ctually wr1t3 h3r3.",
        field : "IT",
        tags : ["programming", "computers", "summer job"],
        duration : "2 months",
        companyId : "1"
    },
    {
        id : "2",
        title : "Marketing Specialist",
        description : "Market some stuff here. Selling apples at Orange",
        field : "Marketing",
        tags : ["programming", "summer job"],
        duration : "3 months",
        companyId : "2"
    },
    {
        id : "3",
        title : "Human Resources Manager",
        description : "Someone to take care of people",
        field : "HR",
        tags : ["full time", "kool"],
        duration : "permanent",
        companyId : "3"
    }
];


/* GET jobs listing. */
router.get('/', function(req, res, next) {
    // Just get the list of title, field
    var listAll = [];
    _.forEach(jobs, function(job) {
        listAll.push({
            id : job.id,
            title : job.title,
            field : job.field
        });
    });
    res.json(listAll);
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