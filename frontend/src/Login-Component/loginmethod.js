import axios from 'axios'
function Log(Email,Password){
    return axios({
        url: "http://localhost:4000/user/login",
        method: "POST",
        responseType: "application/json",
        data: {
            email:Email,
            password:Password
        },
    }).then(function (result) {
       
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
function Sign(Name,Email,mobile,password){
    return axios({
        url: "http://localhost:4000/user/create",
        method: "POST",
        responseType: "application/json",
        data: {
            name:Name,
            email:Email,
            password:password,
            phoneNo:mobile
        },
    }).then(function (result) {
        
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
function ALLemp(Name,Email,mobile,password){
    return axios({
        url: "http://localhost:4000/employee/ALL",
        method: "GET",
        responseType: "application/json",
        data: {
            
        },
    }).then(function (result) {
        
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
function createemp(EmpID,FirstName,LastName,Email,mobile){
    return axios({
        url: "http://localhost:4000/employee/",
        method: "POST",
        responseType: "application/json",
        data: {
            empId:EmpID,
            firstName:FirstName,
            lastName:LastName,
            email:Email,
            phoneNo:mobile,
        },
    }).then(function (result) {
        
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
function geteemp(ID){
    return axios({
        url: `http://localhost:4000/employee/${ID}`,
        method: "GET",
        responseType: "application/json",
        data: {
            
        },
    }).then(function (result) {
        // console.log("RESULT",result)
        // console.log("RESULT.data",result.data)
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
function updateemp(ID,EmpID,FirstName,LastName,Email,mobile){
    return axios({
        url: `http://localhost:4000/employee/${ID}`,
        method: "PATCH",
        responseType: "application/json",
        data: {
            empId:EmpID,
            firstName:FirstName,
            lastName:LastName,
            email:Email,
            phoneNo:mobile,
        },
    }).then(function (result) {
        // console.log("RESULT",result)
        // console.log("RESULT.data",result.data)
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
function deleteemp(ID){
    console.log(ID)
    return axios({
        url: `http://localhost:4000/employee/${ID}`,
        method: "DELETE",
        responseType: "application/json",
        data: {
           
        },
    }).then(function (result) {
       
        return result.data;
    }).catch((err)=>{
        console.log("Error==>",err);
    })
}
export {Log,Sign,ALLemp,createemp,geteemp,updateemp,deleteemp}