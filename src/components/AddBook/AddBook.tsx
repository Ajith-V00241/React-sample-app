import React, { Component } from 'react'
import DataService from '../../services/data.services'
import '../../stylesheets/AddBook.css'
import { Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';

type MyProps = {};
type MyState = {
                title: string,
                author: string,
                publisher: string,
                language:  string,
                description: string,
                totalBooks: number,
                image: string,
                redirect: boolean,
                error: boolean,
                id: any
            }
 class AddBook extends Component< MyProps, MyState >{
    
    constructor(props :any){
        
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeAuthor = this.onChangeAuthor.bind(this)
        this.onChangePublisher = this.onChangePublisher.bind(this)
        this.onChangeLanguage = this.onChangeLanguage.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeTotalBooks = this.onChangeTotalBooks.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.saveBook = this.saveBook.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
        this.validate = this.validate.bind(this)
        
        this.state = {
            title: "",
            description: "",
            author: "",
            language: "",
            publisher: "",
            totalBooks: 0,
            image: "/assets/bookLogo.jpg",
            redirect: false,
            error: false,
            id: null
        }
    
    }

    onChangeTitle(event:any){
         this.setState(
             {
                 title: event.target.value
             }
         )
    }
    onChangeAuthor(event:any){
        this.setState(
            {
                author: event.target.value
            }
        )
    }
    onChangePublisher(event:any){
        this.setState(
            {
                publisher: event.target.value
            }
        )
    }
    onChangeLanguage(event:any){
        this.setState(
            {
                language: event.target.value
            }
        )
    }
    onChangeDescription(event:any){
        this.setState(
            {
                description: event.target.value
            }
        )
    }
    onChangeTotalBooks(event:any){
        this.setState(
            {
                totalBooks: parseInt(event.target.value)
            }
        )
    }
    onChangeImage(event:any){
        this.setState(
            {
                image: event.target.value
            }
        )
    }

    setRedirect(){
        this.setState({
            redirect: true
        })
    }
    validate():boolean{
        var message:string[] = []
        if(this.state.title==="")
            message.push("title")
        if(this.state.description === "")
            message.push("description") 
        if(this.state.author === "")
            message.push("author")   
        if(this.state.language === "")
            message.push("language")   
        if(this.state.publisher === "")
            message.push("publisher")   
        if(!this.state.totalBooks)
            this.setState({totalBooks:0})
        if(message.length!==0)
        {
            
                alert(message.concat()+" can't be blank")
                //ReactDOM.render(<ul>{message.map(msg=><li key={msg}>{msg}</li>)}</ul>,document.getElementById('errors'))
            return false
        }
        else
            return true
       
        
    }

    saveBook(){
        
        //console.log(JSON.stringify(data))

        if(this.validate())
        {   
            var data:any = {
                title: this.state.title,
                author: this.state.author,
                publisher: this.state.publisher,
                language: this.state.language,
                description: this.state.description,
                totalBooks: this.state.totalBooks,
                image: this.state.image
            }
            DataService.create(data)
                .then(resp=>{
                    console.log(resp.data)
                    alert("Book Added. Redirecting to home Page")
                    this.setState({id:resp.data.id})
                    this.setRedirect()
                })
                .catch(e=>{
                    console.log(e)
                })
        }
        
    }
    render(){
         if(this.state.redirect){
             return( <Redirect exact to={`/books/${this.state.id}`} /> )
         }
         return(
             <div className="home">
                <div className="header">
                    <h1> Library Management System </h1>
                    <div className="sub-header">Your Book, Your Mind</div>
                </div>
                <div className="form">
                    <br/>
                    <h1>Add New Book</h1>
                    <br/>
                    <div id="errors"> </div>
                    {/* <form > */}
                        <input className="form-text" id="title" name="title" placeholder="Name" onChange={this.onChangeTitle} required/> <br />
                        <input className="form-text" id="author" name="author" placeholder="Author" onChange={this.onChangeAuthor} required/> <br />
                        <input className="form-text" id="publisher" name="publisher" placeholder="Publisher" onChange={this.onChangePublisher} required/> <br />
                        <input className="form-text" id="language" name="language" placeholder="Langauge" onChange={this.onChangeLanguage} required/> <br />
                        <textarea className="form-description" rows={4} id="description" name="description" placeholder="Description" onChange={this.onChangeDescription} required/> <br />
                        <div >Total Books:</div><input className="form-text" type="number" defaultValue="0" id="totalBooks" name="totalBooks" placeholder="Total Books" onChange={this.onChangeTotalBooks} required/> <br />
                        <input className="form-text" id="imagePath" name="image" placeholder="Image Path" onChange={this.onChangeImage} /> <br />
                        <button className="submit" onClick={this.saveBook}>Add Book</button>
                    {/* </form> */}
                </div>
             </div>
         )
     }
 }

 export default AddBook