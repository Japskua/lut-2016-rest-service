/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var companies = [
    {
        id : "1",
        name : "Test Company",
        business : "IT"
    },
    {
        id : "2",
        name : "A second company",
        business : "IT"
    },
    {
        id : "3",
        name : "A car company",
        business : "Transportation"
    }
];


/* GET companies listing. */
router.get('/', function(req, res, next) {
    res.json(companies);
});

/* GET the company in question */
router.get('/:companyId', function(req, res, next) {
    var companyId = req.params.companyId;
    if(!companyId) {
        res.status(500).send({error : "Missing company ID!"});
        return;
    }

    var matchedCompany = _.find(companies, { "id" : companyId});
    if(!matchedCompany) {
        res.status(500).send({error : "No matching company found with the given id: " + companyId});
    } else {
        res.json(matchedCompany);
    }
});

module.exports = router;