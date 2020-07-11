/** API routes for array of strings. */

const express = require('express');
const router = new express.Router();

const arrayOfStrings = [];

/** GET /   get array of strings
 *
 * Returns:
 * => [ string1, string2, ... ]
 *
 */

router.get('/', async function getInputs(req, res, next) {
  try {
    return res.json(arrayOfStrings);
  } catch (err) {
    return next(err);
  }
});

/** POST /   adds string element to end of array
 *
 * Returns new array with added string:
 * => [ string1, string2, ... ]
 *
 */

router.post('/', (req, res, next) => {
  try {
    // prepend string to arrayOfStrings
    arrayOfStrings.unshift(req.body.input);
    return res.json(arrayOfStrings);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
