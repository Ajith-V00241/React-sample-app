import React, { useState } from 'react'
import DataService from '../../services/data.services'
import '../../stylesheets/EditBook.css'
import { Redirect } from 'react-router-dom';

function EditBook(props:any){
    const [book, setBook] = useState({})
    const [loaded, setLoaded] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false)

    const [title,setTitle] = React.useState("")
    const [author,setAuthor] = React.useState("")
    const [publisher,setPublisher] = React.useState("")
    const [language,setLanguage] = React.useState("")
    const [description,setDescription] = React.useState("")
    const [totalBooks,setTotalBooks] = React.useState(0)
    const [availableBooks,setAvailableBooks] = React.useState(0)
    const [image,setImage] = React.useState("")
    React.useEffect(()=>{
        DataService.get(props.match.params.id)
        .then(resp=>
            {
                console.log(resp)
                if(resp.data.error==="Book not found")
                {
                    setNotFound(true)
                }
                else{
                    setBook(resp.data.data.attributes)
                    setTitle(resp.data.data.attributes.title)
                    setAuthor(resp.data.data.attributes.author)
                    setPublisher(resp.data.data.attributes.publisher)
                    setLanguage(resp.data.data.attributes.language)
                    setDescription(resp.data.data.attributes.description)
                    setTotalBooks(resp.data.data.attributes.totalBooks)
                    setAvailableBooks(resp.data.data.attributes.availableBooks)
                    setImage(resp.data.data.attributes.image)
                }
                setLoaded(true)
            })
        .catch(resp=>{
            console.log(resp)
        })
    },[props.match.params.id])
    let tempBook:any = book

    const onChangeTitle=(event:any) => setTitle(event.target.value)
    const onChangeAuthor = (event:any) => setAuthor(event.target.value)
    const onChangePublisher = (event:any) => setPublisher(event.target.value)
    const onChangeLanguage = (event:any)=> setLanguage(event.target.value)
    const onChangeDescription = (event:any)=> setDescription(event.target.value)
    const onChangeTotalBooks = (event:any)=> setTotalBooks(event.target.value)
    const onChangeAvailableBooks = (event:any)=> setAvailableBooks(event.target.value)
    const onChangeImage = (event:any)=> setImage(event.target.value)
    
    const validate = ()=>{
        if(availableBooks > totalBooks)
        {
            alert("Available Books should not be greater than Total Books")
            return false
        }
        return true
       
        
    }
    const saveBook=()=>{
        if(validate()){
            var data:any = {
                    title: title || tempBook.title,
                    author: author || tempBook.author,
                    publisher: publisher || tempBook.publisher,
                    language: language || tempBook.language,
                    description: description || tempBook.description,
                    totalBooks: totalBooks || tempBook.totalBooks,
                    availableBooks: availableBooks || tempBook.availableBooks,
                    image: image || tempBook.image,
                }
            console.log("data: "+JSON.stringify(data))
            DataService.update(data, props.match.params.id)
                .then(resp=>{
                    console.log(resp)
                    alert("Book has been Updated")
                    setRedirect(true)
                })
                .catch(err=>{console.log(err)})
        }
    }

    return(
        <div className="home">
            {redirect && <Redirect exact to={`/books/${props.match.params.id}`} />}
            {loaded && 
                <div>
                    {notFound &&
                        <div> Book Not Found</div>}
                    {!notFound && 
                        <div>
                            <div className="header">
                                <h1> Library Management System </h1>
                                <div className="sub-header">Your Book, Your Mind</div>
                            </div>
                            <div className="form">
                                <br/>
                                <h1>Edit Book</h1>
                                <br/>
                                <table>
                                    <tbody className="tbody">
                                        <tr>
                                            <td className="left"><label >Title:</label></td>
                                            <td className="right"><input className="form-text" id="title" onChange={onChangeTitle} defaultValue={tempBook.title} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label >Author:</label></td>
                                            <td className="right"><input className="form-text" id="author" onChange={onChangeAuthor} defaultValue={tempBook.author} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label >Publisher:</label></td>
                                            <td className="right"><input className="form-text" id="publisher" onChange={onChangePublisher} defaultValue={tempBook.publisher} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label >Langaue:</label></td>
                                            <td className="right"><input className="form-text" id="language" onChange={onChangeLanguage} defaultValue={tempBook.language} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label >Description:</label></td>
                                            <td className="right"><textarea className="form-description" rows={4} id="description" onChange={onChangeDescription} defaultValue={tempBook.description} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label >Total Books:</label></td>
                                            <td className="right"><input className="form-text" type="number" id="totalBooks" onChange={onChangeTotalBooks} defaultValue={tempBook.totalBooks} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label >Available Books:</label></td>
                                            <td className="right"><input className="form-text" type="number" id="availableBooks" onChange={onChangeAvailableBooks} defaultValue={tempBook.availableBooks} required/> <br /></td>
                                        </tr>
                                        <tr>
                                            <td className="left"><label>Image</label></td>
                                            <td className="right"><input className="form-text" id="image" name="image"  onChange={onChangeImage} defaultValue={tempBook.image}/> <br />
                                </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={saveBook}>Save Book</button>
                                
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default EditBook