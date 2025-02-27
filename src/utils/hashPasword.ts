const Bcrypt = require('bcryptjs');

const genHash=(payload:string)=>{
  return Bcrypt.hashsync(payload,Number(process.env.SALT_ROUND));
}

const compareHash=(hashPayload:string,payload:string)=>{
    return Bcrypt.compareSync(payload,hashPayload)
};

module.exports={genHash,compareHash};