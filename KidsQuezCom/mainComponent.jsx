import React, { Component } from "react";
import Result from "./resultCom";
import Axios from "axios";
import imgCow2 from '../images/c2.jpg';
import imgCow3 from '../images/c3.jpg';
import imgCow4 from '../images/c4.jpg';
import imgCow5 from '../images/c5.jpg';
import imgCow6 from '../images/c6.jpg';
import imgCow7 from '../images/c7.jpg';

import imgElp2 from '../images/e2.jpg';
import imgElp3 from '../images/e3.jpg';
import imgElp4 from '../images/e4.jpg';
import imgElp5 from '../images/e5.jpg';
import imgElp6 from '../images/e6.jpg';

import imgMon2 from '../images/m2.jpg'
import imgMon3 from '../images/m1.jpg'
import imgMon4 from '../images/m4.jpg'
import imgMon5 from '../images/m5.jpg'
import imgMon6 from '../images/m6.jpg'
import imgMon7 from '../images/m7.jpg'
class KidsQuiz extends Component{
    state = {
        questions : [
        {img:imgMon5, Answer:"Monkey"}, {img:imgCow2,Answer:"Cow"}, {img:imgMon2,Answer:"Monkey"}, {img:imgElp2,Answer:"Elephent"},{img:imgCow3,Answer:"Cow"}, {img:imgMon3,Answer:"Monkey"},
        {img:imgMon4,Answer:"Monkey"}, {img:imgCow4,Answer:"Cow"}, {img:imgElp3,Answer:"Elephent"}, {img:imgMon5,Answer:"Monkey"},{img:imgCow5,Answer:"Cow"}, {img:imgElp4,Answer:"Elephent"},
        {img:imgCow6,Answer:"Cow"}, {img:imgElp5,Answer:"Elephent"}, {img:imgMon6,Answer:"Monkey"}, {img:imgCow7,Answer:"Cow"},{img:imgMon7,Answer:"Monkey"}, {img:imgElp6,Answer:"Elephent"},
        {img:imgCow2,Answer:"Cow"}, {img:imgMon3,Answer:"Monkey"}],

        chooseOpt : ["Monkey","Elephent","Cow"],

        personName : {names:''},
        show : 0,
        currIndex:0,
        errors : 0,
        errorMsg : '',
        arrNew :[],

    };
    makeArr(){
        let s={...this.state};
        let {arrNew,questions}=s;
        for(;;)
        {
            if(arrNew.length>=5)break;

            let len=questions.length;
            let index=Math.floor(Math.random() * len);
            
            let fnd=arrNew.find(a=>a===questions[index]);
        if(!fnd)
        {
            arrNew.push(questions[index]);
        }
        }
        this.setState(s);
    }
    componentDidMount(){
        this.makeArr();
    }

    startQuiz = () =>{
        let s = {...this.state};
        if(s.personName.names==='')
        {
            alert("Enter your Name")
        }
        else
        {
            s.show=1;
            s.errorMsg="";
            
        }
        this.setState(s)
    }
    handleChange =(e) =>{
        let s = {...this.state};
        s.personName[e.currentTarget.name] = e.currentTarget.value
        this.setState(s)
    }

    handleTryMore = ()=>{
        let s = {...this.state};
        s.currIndex=0;
        for(;;)
        {
            if(s.arrNew.length>=5)break;
            let len=s.questions.length;
            let index=Math.floor(Math.random() * len);
            
            let fnd=s.arrNew.find(a=>a===s.arrNew[index]);
            if(!fnd)
            {
                s.arrNew.push(s.questions[index]);
            }
        }

        Axios.post("http://localhost:3001/api/insert",
        {countError:s.errorMsg, name:s.personName}).then(()=>{
            alert("successful inserted");
        });
        // console.log(s.personName);
        s.errorMsg='';
        s.errors=0;
        s.show=1;
        this.setState(s)
    } 
    handleAnswer = (num) =>{
        let s = {...this.state};
        console.log(s.currIndex); 
        if(s.arrNew[s.currIndex].Answer===num)
        {
            s.errorMsg='';
            if((s.arrNew.length-1)>s.currIndex)
            {
                s.currIndex++;
            }
            else if((s.arrNew.length-1) === s.currIndex)
            {
                s.show=2;
                s.currIndex=0;
                s.arrNew=[]; 
            }
        }      
        else
        {
            s.errorMsg="Choose correct options";
            s.errors++;
            s.show=1;
        }
        this.setState(s);
    }
    showQuestions = () =>{
        let s = {...this.state};
        let arr = s.arrNew[s.currIndex];
        return(
            <React.Fragment>
                <h4>Question Number : {s.currIndex+1}</h4>
                {s.errorMsg==='' ? '' :<h5 className="text-danger">{s.errorMsg}</h5>}
                <img src={arr.img} alt="images" className='img-fluid' 
                    style={{"width":"300px","height":"100%"}} />
                <div className='row col-md-5 col-lg-4 col-sm-4'>
             {s.chooseOpt.map((num)=>{
             return <React.Fragment>
                   <div className='col-md-4 col-lg-4 col-sm-6'>
                          <button className="btn btn-primary btn-sm m-1"
                       onClick={()=>this.handleAnswer(num)}>{num}</button>
                   </div>
            </React.Fragment>
        })}
             </div>
            </React.Fragment>
        )
    }
    render() {
        let {show,personName,errors} = this.state;
        
        let {names} = personName;
        return (
            <React.Fragment>
                <div className="container m-2">
                {show===0 ? <React.Fragment>
                    <h3>Welcome to the Kids Quiz App</h3><br/>
                <div className="row">
                    <div className="form-group">
                        <label><b>Enter Your Name</b></label>
                        <input 
                        type="text"
                        className="form-control"  
                        name="names"
                        value={names}
                        placeholder="Enter  Name" 
                        onChange={this.handleChange}/>
                    </div>
                </div>    

                <button className="btn btn-primary m-2" 
                    onClick={()=>this.startQuiz()}>Start Quiz</button>
                </React.Fragment> : show===1 ? 

                <React.Fragment>
                    <div className="container">
                        {this.showQuestions()}
                    </div>
                </React.Fragment>
                : show===2 ? <Result 
                personName={personName} 
                errors={errors} tryMore={this.handleTryMore}/>:''}
                    
                </div>
            </React.Fragment>
        )
    }
}
export default KidsQuiz;