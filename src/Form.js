import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './style.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const colorArray = [
    "red",
    "lightblue",
    "pink",
    "yellow",
    "brown",
    "magenta"
  ];

    export default class Form extends React.Component{

    constructor(props) {
        super(props);
        
      }
      changeColor(e) {
        this.setState({
            color: this.Rand(colorArray)
  
        })
      }
     divStyle = {
       
        top:0,
        right: 0,
        
      };
      

    state= {

        userId:"",
        userIdError:"",
        password:"",
        passwordError:"",
        color: "ROSYBROWN",
        open: false,
        error:"",
        success:"Submission Successfull"

    };
    handleClickOpen = (ValidError) => {
        this.setState({ 
            open: true,
            error: ValidError
        });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
     Transition=(props)=> {
        return <Slide direction="up" {...props} />;
      };
      
    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    

    checkForUserError= () =>{
            let isUserError=false;

          
        if(this.state.userId.length <1){
            isUserError=true;
          this.state.userIdError="UserName Should Not Be Empty";
        }
       
      
            this.setState({

                ...this.state,
              
            });
        
        return isUserError;
    };
    checkForPasswordError= () =>{
      
        let isPassError=false;
        
  
    if(this.state.password.length <1){
        isPassError=true;
        this.state.passwordError="Password Should Not Be Empty";
      }
  
        this.setState({

            ...this.state,
           
        });
    
    return isPassError;
};
 Rand=(NewDictionary) =>{
    const keys = Object.keys(NewDictionary);
    let i = keys.length - 1;
    const j = Math.floor(Math.random() * i);
    return NewDictionary[keys[j]];
  };
    onSubmit = e =>{
       
        e.preventDefault();
        //this.props.onSubmit(this.state);
        const err=this.checkForUserError();
        const passErr=this.checkForPasswordError();
        if(err){
          
            this.handleClickOpen(this.state.userIdError);
        }
        if(passErr)
        {
            this.handleClickOpen(this.state.passwordError);
        }
        if(!err && !passErr){

            this.handleClickOpen(this.state.success);
        this.setState({
            userId:"",
        password:"",
        });    
        this.props.onChange({
            userId:"",
            password:"",
        });
    }
    };
  
    
   render(){
    const stylesObj = {
        background: this.state.color,
       
      };
  
    return(
       
        <div style={stylesObj} className={styles.container}>
 
        
        <Dialog
          open={this.state.open}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
           
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
             {this.state.error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      <form >
          <TextField
         name="userId"
         label="User Id"
         value={this.state.userId}
         onChange= {e => this.change(e)}
         
         margin="normal"
         
         
        />
        <br/>
        <TextField
          name="password"
          label="Password"
          value={this.state.password}
          onChange={e=> this.change(e)}
          margin="normal"
          type="password"
          
          
        
        />
          <br/>
          <Button onClick={e => this.onSubmit(e)} variant="contained" color="primary" >
         Submit</Button>
                 
     
       <div className={styles.content}>
          
           <Button value="black" onClick={this.changeColor.bind(this)} style={{backgroundColor:this.state.bgColor }} variant="contained" color="secondary" >
        Change Color
      </Button>
        </div>
        </form>
        </div>
    );

   }
}
