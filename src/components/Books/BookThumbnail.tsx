import React from 'react'
import '../../stylesheets/BookThumbnail.css'
import { Link} from 'react-router-dom'

function BookThumbnail(props:any){
    let src:string = `${props.attributes.image}`
    return(
       <div className="card">
           <div className="book-image">
               <img src={src} alt={props.attributes.title} />
           </div>
           <div className="book-title">{props.attributes.title}</div>
           <div className="book-author">{props.attributes.author}</div>
           <div className="book-link">
               <Link to={`/books/${props.attributes.id}`}>View Book</Link>
           </div>
        </div>
    )
}

export default BookThumbnail