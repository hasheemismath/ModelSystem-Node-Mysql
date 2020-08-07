module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("users",{
        username: {
            type:Sequelize.STRING,
            validate:{
                notEmpty:true,
                min:5,
                max:15,
                len: [4,10]
            }
        },
        email:{
            type:Sequelize.STRING,
            validate:{
                notEmpty:true,
                isEmail: true,
                len:[5-20]
            }
        },
        password:{
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
                len:[5-10]

            }
        }
    })

    return User;
}
