import React from 'react'
import SI from '../Images/SI.png'
import {Sign,Log} from '../Login-Component/loginmethod'
class Signup extends React.Component{
constructor(props){
    super(props)
    this.state={
        Logfirstname: '',
        LogEmail:'',
        Logpassword:'',
        Logconfirmpassword:'',
        Logmblno:'',
        Issignup:false,
        error:{}
    }
}
handleChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
    
}
OnlyNumbers = (e) => {
    const charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57 )) || charCode === 190) {
            e.preventDefault();
        }}
validate = () => {
    var NAME = this.state.Logfirstname
    var err = this.state.error;
    var status;
    // console.log("please enter name")
    
    if (NAME === '') {
        err.Logfirstname = "*Please Enter Name"
        status = false
    }
    //To check Length of the first name  
    else if (!(NAME.length >= 3 && NAME.length <= 12)) {
        err.Logfirstname = "*please enter proper First Name"
        status = false
    }
    else {
        err.Logfirstname = "";
        status = true;

    }
    this.setState({
        error: err                                       
    })
    return status;
}

validatemail=()=>{
    console.log("hi")
    let Loginmail=this.state.LogEmail;
    let err=this.state.error;
    var pattern = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var status;
    if(Loginmail===""){
        err.LogEmail="*Please Enter EmailID"
        status=false
    }
    else if(!(Loginmail.match(pattern))){
        err.LogEmail="*Please Enter valid EmailID"
        status=false
    }
    else{
       
        err.LogEmail=""
        status=true 
        
    }

    this.setState({
        error:err
    })
    return status
}
validatemblnumber=async()=>{
    var err = this.state.error
    var status
    var mblno = this.state.Logmblno
    if(mblno===""){
        err.Logmblno = "Please Enter Mobile number"
        status = false;
    }
    else{
        err.Logmblno = ""
        status = true;
    }
    this.setState({
        error: err
    })
    return status
}
validatpassword=()=>{
    let Logpassword=this.state.Logpassword;
    var upper = /[A-Z]/;
    var lower = /[a-z]/;
    var number = /[0-9]/;
    var spcase = /[!,@,#,$,%,^,&,*]/;
    let status;
    let err=this.state.error;
    if(Logpassword===""){
        err.Logpassword="*Please Enter Password"
        status=false
    }
    else if(!(Logpassword.match(lower))){
        err.Logpassword="*Your Password must consist of Lower Case"
        status=false
    }
    else if(!(Logpassword.match(upper))){
        err.Logpassword="*Your Password must consist of Upper Case"
        status=false
    }
    else if(!(Logpassword.match(number))){
        err.Logpassword="*Your Password must consist of Number"
        status=false
    }
    else if(!(Logpassword.match(spcase))){
        err.Logpassword="*Your Password must consist of Spcialcase"
        status=false
    }
    else if(!(Logpassword.length >= 8) || (Logpassword.length >= 20)){
        err.Logpassword="*Your password must contain atleast 8 to 20 character"
        status=false
    }
    else{
        err.Logpassword=""
        status=true
    }
    this.setState({
        error:err
    })
    return status
}
validateconfrim = () => {
    var Logconfirmpassword = this.state.Logconfirmpassword
    var Password = this.state.Logpassword
    var err = this.state.error
    var status
    if (Logconfirmpassword === "") {
        err.Logconfirmpassword = "Please Enter Confirm Password"
        status = false;
    }
    //To check password and confirm password are same or not
    else if (Logconfirmpassword != Password) {
        err.Logconfirmpassword = "Password and confirm password must be same"
        status = false;
    }
    else {
        err.Logconfirmpassword = ""
        status = true;
    }
    this.setState({
        error: err
    })
    return status;
}
ValidateAll=()=>{
        var fstname =  this.validate();
        var email =  this.validatemail();
        var pass =  this.validatpassword();
        var cpass =  this.validateconfrim();
        var mblno =  this.validatemblnumber()
    console.log(fstname,"fstname")
    console.log(email,"email")
    console.log(pass,"pass")
    console.log(mblno,"mblno")
    console.log(cpass,"cpass")
    if ((fstname && email && pass && mblno && cpass) === true){
        Sign(this.state.Logfirstname,this.state.LogEmail,this.state.Logmblno,this.state.Logconfirmpassword).then((res)=>{
            console.log(res,"Password and confirm password must be same")
        })
        
        
        this.setState({
            Logfirstname: '',
            
            LogEmail:'',
            Logpassword:'',
            Logconfirmpassword:'',
            Logmblno:'',
            Issignup:true,
        })
        window.open("http://localhost:3000/Dashbord",null)
        console.log('SURYA',this.state.Issignup)
    }
    else{
        console.log('SURYA')
    }
    
    
    
    
}
render(){
    return(
        <div className='container'>
            <div className='aligner'>
            <div className='sign'>Sign Up</div>    
            <div className='Emp-profile'>
                <img src={SI}/>
            </div>
            <div className='Log-Firstname'>
                <input type='text'
                id='input-field'
                 onChange={this.handleChange} 
                 name='Logfirstname' 
                 value={this.state.Logfirstname} 
                 placeholder='NAME' 
                 onBlur={this.validate} />
            </div>
            <div className='Error1'>{this.state.error.Logfirstname}</div>
            
            <div className='Log-Email'>
                <input type="text"
                id='input-field'
                name='LogEmail'
                placeholder='EMAIL'
                value={this.state.LogEmail} 
                onChange={this.handleChange} 
                onBlur={this.validatemail}
                />
            </div>
            <div className='Error'>{this.state.error.LogEmail}</div>
            <div className='Log-Email'>
                <input type='text' 
                id='input-field' 
                name='Logmblno'
                onChange={this.handleChange} 
                onBlur={this.validatemblnumber} 
                 maxLength="10" 
                 value={this.state.Logmblno} 
                 onKeyPress={this.OnlyNumbers}
                 placeholder='MOBILE NUMBER' />
            </div>
            <div className='error'>{this.state.error.Logmblno}</div>
            <div className='Log-Email'>
                <input type="text"
                id='input-field'
                name='Logpassword'
                placeholder='PASSWORD'
                value={this.state.Logpassword} 
                onChange={this.handleChange} 
                onBlur={this.validatpassword}
                />
            </div>
            <div className='Error1'>{this.state.error.Logpassword}</div>
            <div className='Log-Email'>
                <input type='text'  
                id='input-field'
                onChange={this.handleChange} 
                name='Logconfirmpassword' 
                onBlur={this.validateconfrim}
                value={this.state.Logconfirmpassword}  
                placeholder='CONFIRM PASSWORD' />
            </div>
            <div className='error'>{this.state.error.Logconfirmpassword}</div>
            <div className='acc'>Already have a  Account ?<a href='http://localhost:3000/Login'id='acclr'>Log in</a></div>
            <button id='Signup' onClick={this.ValidateAll}>Signup</button>
           
            </div>
            
        </div>
    )
}
}
export default Signup