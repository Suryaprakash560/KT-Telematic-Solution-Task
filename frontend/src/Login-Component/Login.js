import React from 'react';
import SI from '../Images/SI.png';
import {Log} from './loginmethod'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            LogEmail:'',
            Logpassword:'',
            sign:'',
           error:{}
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })}
        validatemail=()=>{
            console.log("hi")
            let Loginmail=this.state.LogEmail;
            let err=this.state.error;
            var pattern = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let status
            if(Loginmail===""){
                err.LogEmail="*Please Enter EmailID"
                status=false
            }
            else if(!(Loginmail.match(pattern))){
                err.LogEmail="*Your Enter valid EmailID"
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
        LogInValidateAll=()=>{
            var status; 
            let err=this.state.error;
            var email =  this.validatemail();
            var pass =  this.validatpassword();
            if ( (email && pass)  === true){
                Log(this.state.LogEmail,this.state.Logpassword).then((res)=>{
                    console.log(res)
                    if(res.message==="Wrong credentials !"){
                        err.sign="Login Failed"
                        status=false
                    }
                    else if (res.message==="User not registered !") {
                        err.sign="Login Failed"
                        status=false
                    }
                    else{
                        err.sign=""
                        status=true 
                        window.open("http://localhost:3000/Dashbord",null)
                    }
                    this.setState({
                        error:err
                    })
                })
            this.setState({
                error:err,
                    LogEmail:'',
                    Logpassword:'',
                })
                
            }
            else{
        
            }
        }
        render(){
            return(
                <div className='container'>
                    <div className='aligner'>
                    <div className='sign'>LogIn</div> 
                    <div className='Emp-profile'>
                <img src={SI}/>
            </div>   
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
            <div className='Error1'>{this.state.error.sign}</div>
            <button id='LogIn' onClick={this.LogInValidateAll}>LogIn</button>
            </div>
            </div>
           
            )}
    
}
export default Login