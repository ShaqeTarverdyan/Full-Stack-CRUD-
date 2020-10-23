import React from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({news}) => {
    return(
        <div>
            <span>{news.title}</span>
            <Link
                to={{
                    pathname:"/news-details/"+news.id,
                    aboutProps: {
                        news: news
                    }
                }}
            ><button>Details</button></Link>

        </div>
    )
}


export default NewsItem;