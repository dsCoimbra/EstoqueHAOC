const localStrategy = require("passport-local").Strategy;
const connection = require("../database/connection")
const bcrypt = require("bcryptjs")

const user = await connection('tb_users').select('name','pass','typesUser')