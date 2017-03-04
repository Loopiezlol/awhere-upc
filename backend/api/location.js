const router = require('express').Router();
// const wrap = require('co-express');

function handleLocation(req, res) {
  console.log(req.body);
  res.json({
    ok: true,
  });
}

router.put('/', handleLocation);

module.exports = router;
