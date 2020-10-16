import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNews } from '../../../store/actions/newsActions';

const NewsItem = ({news, deleteNews}) => {
    return(
        <div>
            <span>{news.title}</span>
            <button onClick={() => deleteNews(news.id)}>delete</button>
            <Link 
                to={{
                    pathname:"/update-news/"+news.id,
                    aboutProps: {
                        news: news
                    }
                }}
            >
                <button>update</button>
            </Link>
        </div>
    )
}

const mapDispatchToState = dispatch => {
    return {
        deleteNews: (newsId) => dispatch(deleteNews(newsId))
    }
}

export default connect(null, mapDispatchToState)(NewsItem);