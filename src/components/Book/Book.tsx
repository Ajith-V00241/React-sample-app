import React from 'react'
import DataService from '../../services/data.services'
import '../../stylesheets/Book.css'
import { useHistory, Link } from 'react-router-dom';
function Book(props:any){

    
    const [book,setBook] = React.useState({})
    const [loaded, setLoaded] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    
    if(redirect){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useHistory().push('/')
    }
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
                }
                setLoaded(true)
            })
        .catch(resp=>{
            console.log(resp)
        })
    },[props.match.params.id])
    
    let tempBook:any = book
    
    return(
        <div className="home">
            {   loaded &&
                <div>
                    {notFound &&
                        <div> Book Not Found</div>}
                    {!notFound && 
                        <div>
                            <div className="header">
                                <h1>Library Management System</h1>    
                                <div className="sub-header"></div>
                            </div>
                            <div className="image">
                                <img src={tempBook.image} alt={tempBook.title}/>
                            </div>
                            <div className="book-table">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="left-column">Title</td>
                                            <td> : </td>
                                            <td>{tempBook.title}</td>
                                        </tr>
                                        <tr>
                                            <td className="left-column">Author</td>
                                            <td> : </td>
                                            <td>{tempBook.author}</td>
                                        </tr>
                                        <tr>
                                            <td className="left-column">Publisher</td>
                                            <td> : </td>
                                            <td>{tempBook.publisher}</td>
                                        </tr>
                                        <tr>
                                            <td className="left-column">Language</td>
                                            <td> : </td>
                                            <td>{tempBook.language}</td>
                                        </tr>
                                        <tr>
                                            <td className="left-column">Description</td>
                                            <td> : </td>
                                            <td>{tempBook.description}</td>
                                        </tr>
                                        <tr>
                                            <td className="left-column">Total Books</td>
                                            <td> : </td>
                                            <td>{tempBook.totalBooks}</td>
                                        </tr>
                                        <tr>
                                            <td className="left-column">Available Books</td>
                                            <td> : </td>
                                            <td>{tempBook.availableBooks}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br/><br/>
                            <div className="edit-link">
                                <Link to={`/books/${props.match.params.id}/edit`}>Edit Book</Link>
                            </div>
                            <div>
                                <button className="delete-button" onClick={deleteBook}>Delete Book</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
    
    function deleteBook()
    {  
        //alert("delete?")
        //DataService.delete()
        DataService.delete(props.match.params.id)
            .then(resp=> {
                console.log(resp)
                alert("Book Deleted. Redirecting to home Page")
                setRedirect(true)
            })
            .catch(e=>console.log(e))

    }

}



export default Book