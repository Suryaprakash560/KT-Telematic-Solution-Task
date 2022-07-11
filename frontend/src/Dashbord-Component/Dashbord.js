import React from 'react';
import {ALLemp,createemp,geteemp,updateemp,deleteemp} from '../Login-Component/loginmethod'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

class Dashbord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
            empid: '',                                
            firstname: '',
            lastname: '',
            email: '',           
            mblno:'',
            rows:[],
            
            error: {},
            columns:[
                { field: 'empId', headerName: 'EMP ID', width: 90 ,flex:1,},
                {
                  field: 'firstName',
                  headerName: 'First name',
                  width: 150,
                  flex:1,
                //   editable: true,
                },
                {
                  field: 'lastName',
                  headerName: 'Last name',
                  width: 150,
                  flex:1,
                //   editable: true,
                },
                {
                  field: 'email',
                  headerName: 'Email',
                  flex:1,
                  width: 110,
                //   editable: true,
                },
                {
                  field: 'phoneNo',
                  headerName: 'Mobile Number',
                  sortable: false,
                  width: 160,
                  flex:1,
                  
                },
               
                {
                    field: 'Active',
                    headerName: 'Active',
                    
                    width: 160,
                    flex:1,
                    
                    renderCell: (params) =>
                    
                    {
                    
                        return(
                    <div className="icon-div">
                        {console.log(params)}
                        <i class="fa fa-pencil" id="pencil-icon" aria-hidden="true" onClick={()=>this.edit(params.row._id)}></i>
                        <i class="fa fa-trash" id="delete-icon" aria-hidden="true" onClick={()=>this.delete(params.row._id)}></i>
                    </div>)}
                   
                  },
                
              ],
              editablerow:false,
              IDS:'',
        }
        this.Save = this.Save.bind(this);
    }
  async componentDidMount(){
    console.log("please Employee ID")
    await ALLemp().then((result)=>{
        console.log(result,"please Employee ID")
        this.setState({
            rows: result
        })
        console.log(this.state.rows,"please Employee ROW")
    })
   }
//    componentWillUpdate=()=> {
//     this.componentDidMount()
//    }
  edit=(i)=>{
    console.log(i);
    
    geteemp(i).then((result)=>{
        console.log(result,"Employee")
        this.setState(
            {   
                empid:result.empId,    
            firstname:result.firstName ,
            email: result.email,
            mblno:result.phoneNo,
            lastname:result.lastName,
            editablerow:true,
            IDS:i
            }
        )
    })
    
    
}
update=()=>{
    updateemp(this.state.IDS,this.state.empid,this.state.firstname,this.state.lastname,this.state.email,this.state.mblno).then((res)=>{
        console.log(res)
    })
}
    handleTextChange = (event) => {                        
        this.setState({
            [event.target.name]: event.target.value       
        })
    }
    validateempid=()=>{
        var Empid = this.state.empid
        var er1 = this.state.error;
        var status;
        if (Empid === '') {           
            er1.empid = "please Employee ID"
            status = false
        }
        else{
            er1.empid = ""
            status = true 
        }
        this.setState({
            error: er1
        })
        return status
    }
    validate = () => {
        var NAME = this.state.firstname
        var er1 = this.state.error;
        var status;
        if (NAME === '') {           
            er1.firstname = "please Enter Name"
            status = false
        }
        
        else if (!(NAME.length >= 3 && NAME.length <= 12)) {           
            er1.firstname = "please enter proper first name"
            status = false
        }
        else {
            er1.firstname = "";           
            status = true;
        }
        this.setState({
            error: er1                                        
        })
        return status;
    }
   
    validatelast = () => {
        var LNAME = this.state.lastname
        var er2 = this.state.error;
        var status;
       if (LNAME === '') {           
            er2.lastname = "please enter name"
            status = false
        }     
        else if (LNAME.length > 5) {
            er2.lastname = "please enter valid last name"
            status = false
        }
        else {
            er2.lastname = "";
            status = true;
        }
        this.setState({
            error: er2
        })
        return status;
    }
    
    validateemail = async () => {
        var Email = this.state.email                                                        
        var er3 = this.state.error                                                           
        var pattern = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var status                                                              
        var IsExists;    
        if (Email === "") {                                                             
            er3.email = "Enter the mail id"
            status = false;
        }
        else if (!(Email.match(pattern))) {                                       
            er3.email = "Enter valid mail id"
            status = false;  
            this.setState({                                                        
                error: er3
            })
        }
        else {                                                                   
                    status = true;
                    er3.email = ""
               
                this.setState({                                                         
                    error: er3
                })         
        }

        return status;
    }
    validatemblnumber=async()=>{
        var er6 = this.state.error
        var status
        var mblno = this.state.mblno
        var upper = /[A-Z]/;
        var lower = /[a-z]/;
        var spcase = /[!,@,#,$,%,^,&,*]/;
        // console.log(mblno)
        if(mblno===""){
            er6.mblno = "Please Enter Mobile number"
            status = false;
        }
        else if(mblno.match(upper)){
            er6.mblno = "Mobile no dose not consist Alphabets"
            status = false;
        }
        else if(mblno.match(lower)){
            er6.mblno = "Mobile no dose not consist Alphabets"
            status = false;
        }
        else if(mblno.match(spcase)){
            er6.mblno = "Mobile no dose not consist spcialcase"
            status = false;
        }
        else {        
                    er6.mblno = ""
                    status = true;
                }
        this.setState({
            error: er6
        })
        return status;
        
    }
    OnlyNumbers = (e) => {
        const charCode = (e.which) ? e.which : e.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57 )) || charCode === 190) {
                e.preventDefault();
            }}
    //Here we check all the geted values are true or not 
    Save = () => {
        let flag=false
        var fstname =   this.validate();
        var lstname =  this.validatelast();
        var email =  this.validateemail();
        var mblno = this.validatemblnumber()
        var emid=this.validateempid()
        let array = this.state.LogArray
        
        if ((((fstname && lstname) && (email && mblno) && emid ))) {
            flag = true;
            console.log(this.state.empid,"empid")
            console.log(this.state.firstname,"firstname")
            console.log(this.state.lastname,"lastname")
            console.log(this.state.email,"Email")
            console.log(this.state.mblno,"mblno")
            createemp(this.state.empid,this.state.firstname,this.state.lastname,this.state.email,this.state.mblno).then((res)=>{
                console.log(res)
            })
        
     
            }
           
        
        
        this.setState({
            LogArray:array,
            firstname: '',
            empid: '',
            lastname: '',
            email: '',
            mblno:'',
            edit:-1,
        })
        console.log(this.state.LogArray)
        return flag;

    }
    Cancel=()=>{
        this.setState({
            // LogArray:'',
            firstname: '',
            lastname: '',
            email: '',
            mblno:'',
            empid:'',
            edit:-1,
        })
    }
    
    delete=(i)=>{
        console.log(i,'DELETE')
        deleteemp(i).then((res)=>{
            console.log(res)
        })
        
    }

    render() {
         
        return (
            <div>
            
            <div className='bgimg'>
                <div className='Dbord'><h1>DashBord</h1></div>
                <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={this.state.rows}
        columns={this.state.columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20, 30]}
        getRowId={(row) => row?.empId}
        autoHeight={true}
        style={{
            width: "100%",
            margin: "0 auto",
            backgroundColor: "white",
            border: "none",
  }}
        // checkboxSelection
        // disableSelectionOnClick
      />
    </Box>
                <div className='aligner'>
                <div className='display'>
                    <div className='manage1'></div>
                    <div className='manage2'>
                        {/* <img src={SI} alt="img2" id='siim' /> */}
                        <div className='txt1'>
                            <input type='text' id='txt1' onChange={this.handleTextChange} name='empid' onKeyPress={this.OnlyNumbers} value={this.state.empid} placeholder='Emp ID' onBlur={this.validateempid} />
                        </div>
                        <div className='error'>{this.state.error.empid}</div>
                        {/* First Name */}
                        <div className='txt1'>
                            <input type='text' id='txt1' onChange={this.handleTextChange} name='firstname' value={this.state.firstname} placeholder='FIRST NAME' onBlur={this.validate} />
                        </div>
                        <div className='error'>{this.state.error.firstname}</div>
                        {/* Last Name */}
                        <div className='txt2'>
                            <input type='text' id='txt2' name='lastname' onChange={this.handleTextChange} placeholder='LAST NAME' value={this.state.lastname} onBlur={this.validatelast} />
                        </div>
                        <div className='error'>{this.state.error.lastname}</div>
                        {/* Email */}
                        <div className='txt3'>
                            <input type='text' id='txt3'  onChange={this.handleTextChange} name='email' placeholder='EMAIL ID' value={this.state.email} onBlur={this.validateemail} />
                        </div>
                        <div className='error'>{this.state.error.email}</div>
                        
                            <div className='txt5'><input type='text' id='txt5' onKeyPress={this.OnlyNumbers} name='mblno'onChange={this.handleTextChange} value={this.state.mblno} onBlur={this.validatemblnumber} maxLength='10' placeholder='MOBILE NUMBER' /></div>
                            
                        
                        <div className='error'>{this.state.error.mblno}</div>
                        {/* Password */}
                        <div className='BUTTONS'>
                            {this.state.editablerow===false?
                        <button className='Btn1' onClick={()=>this.Save()}>SAVE</button>:<button className='Btn1' onClick={()=>this.update()}>Update</button>}
                        <button className='Btn2' onClick={()=>this.Cancel()}>CANCEL</button>
                        </div>
                    </div>
                    
                    
                </div>
            {/* {this.state.LogArray.length>0 ?
                <div className='Dash-Info'>
                {this.state.LogArray.map((x,i)=>
                    <div className="row added-details" key={i} >
                        <div className="col-8 colname-mail"> 
                        {console.log(x.FirstName,'Dash-Info')}
                        <p className="added-name">{x.EmpID}</p>
                            <p className="added-name">{x.FirstName}</p>
                            <p className="added-email">{x.LastName}</p>
                            <p className="added-mob">{x.Email}</p>
                            <p className="added-mob">{x.MobileNumber}</p>
                        </div>
                        <div className="col-4 icon-div">
                            <i class="fa fa-pencil" id="pencil-icon" aria-hidden="true" onClick={()=>this.edit(i)}></i>
                            <i class="fa fa-trash" id="delete-icon" aria-hidden="true" onClick={()=>this.delete(i)}></i>
                        </div>
                    </div> 
                )} 
                </div>:<></>
            } */}
            </div>
            </div>
            </div>)
    }
}
export default Dashbord                    