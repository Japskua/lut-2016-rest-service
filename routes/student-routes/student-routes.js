/**
 * Created by parkkila on 19.2.2016.
 */
"use strict";

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var students = [
    {
        id : "1",
        name : "Jack Brown",
        major : "CS",
        year : "2",
        lookingFor : ["summer job"],
        contactDetails : {
            email : "jack@lut.fi",
            phone : "555-132465798"
        }
    },
    {
        id : "2",
        name : "Michael Smith",
        major : "CS",
        year : "4",
        lookingFor : ["summer job", "master thesis", "small jobs"],
        contactDetails : {
            email : "michael.smith@fakemail.fi",
            phone : "555-84891484"
        }
    },
    {
        id : "2",
        name : "Mr Summers",
        major : "IT",
        year : "5",
        lookingFor : ["master thesis"],
        contactDetails : {
            email : "summers@happy.com",
            phone : "555-999556565"
        }
    }
];


/* GET students listing. */
router.get('/', function(req, res, next) {
    // Just get the list of name, major, year
    var listAll = [];
    _.forEach(students, function(student) {
        listAll.push({
            id : student.id,
            name : student.name,
            major : student.major,
            lookingFor : student.lookingFor,
            year : student.year
        });
    });
    res.json(listAll);
});

/* GET the student in question */
router.get('/:studentId', function(req, res, next) {
    var studentId = req.params.studentId;
    if(!studentId) {
        res.status(500).send({error : "Missing student ID!"});
        return;
    }

    var matchedStudent = _.find(students, { "id" : studentId});
    if(!matchedStudent) {
        res.status(500).send({error : "No matching student found with the given id: " + studentId});
    } else {
        res.json(matchedStudent);
    }
});

module.exports = router;