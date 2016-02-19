/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var applications = [
    {
        id : "1",
        studentId : "1",
        description : "I am a cood koder",
        field : "IT",
        tags : ["programming", "computers", "summer job"]
    },
    {
        id : "2",
        studentId : "3",
        description : "I haz pr0gramz",
        field : "IT",
        tags : ["programming", "masters thesis"]
    }
];


/* GET applications listing. */
router.get('/', function(req, res, next) {
    // Just list all applications
    res.json(applications);
});

/* GET the job in question */
router.get('/:applicationId', function(req, res, next) {
    var applicationId = req.params.applicationId;
    if(!applicationId) {
        res.status(500).send({error : "Missing application ID!"});
        return;
    }

    var matchedApplication = _.find(applications, { "id" : applicationId});
    if(!matchedApplication) {
        res.status(500).send({error : "No matching application found with the given id: " + applicationId});
    } else {
        res.json(matchedApplication);
    }
});

module.exports = router;