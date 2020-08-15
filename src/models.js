const {Sequelize,Datatypes, DataTypes} = require('sequelize')
const bcrypt=require('bcryptjs')

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST} = require('./config')
const sequelize=new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    dialect:'mysql',
    host:DB_HOST
})

//Model for Users Table
const User=sequelize.define('User',{
    email:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    hooks:{
        beforeCreate:(user)=>{
            const salt=bcrypt.genSaltSync(10)
            user.password=bcrypt.hashSync(user.password,salt)
        }
    }
}
)

User.prototype.validatePassword=function(password){
    return bcrypt.compare(password,this.password)
}

//Model for Roles Table
const Role=sequelize.define('Role',{
	email:{
		type:DataTypes.STRING(30),
		allowNull:false
	},
    role:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
})

User.hasOne(Role)
Role.belongsTo(User)

/*const init=async function(){
    try{
    await User.sync({alter:true})
    await Role.sync({alter:true})
    }
    catch(err)
    {
        console.log(err)
    }
}
init()*/

module.exports={User,Role}