const express = require ('express');
const router = express.Router();

router.get('/',(request,result)=>{
    result.send(' server up and running')

});

module.exports = router;