import * as React from 'react'
import BookThumbnail from './BookThumbnail'
import DataService from '../../services/data.services'
import '../../stylesheets/Books.css'
import {Link} from 'react-router-dom'

function Books(props:any) {

    const [books, setBooks] = React.useState([])
    React.useEffect(()=>{
        DataService.getAll()
        .then(resp=>{
            //console.log(resp)
            setBooks(resp.data.data)
        })
        .catch(resp=>console.log(resp))
    },[books.length])

    const bookList = books.map(item=>{
        let tempItem:any=item
        //console.log(tempItem.id)
        return (
                <BookThumbnail 
                    key={tempItem.attributes.title}
                    attributes={tempItem.attributes}
                />
            )
    })
    return(
        <div className="home">
            
            <div className="header">
                <h1> Library Management System </h1>
                <div className="sub-header">Your Book, Your Mind</div>
                <div className="add-link">
                    <Link to={`/book/new`} >Add new Book</Link>
                </div>
            </div>
            <div className="grid">
                {bookList}
            </div>
        </div>
    )
}
export default Books