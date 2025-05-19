// server/api/index.js
const express = require('express');
const resumeRoutes = require('./resume');
const sopRoutes = require('./sop');

const router = express.Router();

router.use('/resume', resumeRoutes);
router.use('/sop', sopRoutes);

module.exports = router;