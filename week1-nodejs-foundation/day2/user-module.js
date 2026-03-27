const users = []

function adduser(name,age) {
    const user = {
        id: users.length + 1,
        name: name,
        age:age,
        createAT: new Date()
    };
    users.push(user)
    return user;
}

function getAllUsers (){
    return users
}

function finduserbyid(id){
    return users.find(user => user.id === id)
}
function deleteuser(id){
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) {
        return users.splice(index,1)[0]
    }
   return null;
}

module.exports = {
adduser,
getAllUsers,
finduserbyid,
deleteuser
}