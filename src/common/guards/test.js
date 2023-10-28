// import * as bcrypt from 'bcrypt';

const bcrypt = require('bcrypt');

async function inifunc(pass) {
  const isMatch = await bcrypt.compare(pass, '$2b$10$Unnrebys4MjFZSdkHpaz3.bO/PQ3yK1e.rq1EFThiMYZpUX3BC6iC');
  console.log(isMatch);
}

inifunc('test123');