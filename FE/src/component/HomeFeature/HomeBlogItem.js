import React from 'react';
import { Link } from 'react-router-dom';
import './blogitem.scss';
function HomeBlogItem(props) {
    const { data } = props;

    return (
        <div className="col-lg-4 col-md-6">
            <div className="single-blog">
                <div className="thumb">
                    <img 
                        style={{ width: '100%', height: '243px', objectFit: 'cover', cursor: 'pointer' }}
                        className="img-fluid" 
                        src={data?.image || 'default-image-url.jpg'} 
                        alt="" 
                    />
                </div>
                <div className="short_details">
                    <div className="meta-top d-flex">
                        <a>
                            {data?.userData 
                                ? `${data.userData.firstName} ${data.userData.lastName}` 
                                : 'Admin'}
                        </a>
                        <a>
                            <i className="ti-comments-smiley" />
                            {data?.commentData ? data.commentData.length : 0} Comment
                        </a>
                    </div>
                    <Link className="d-block" to={`/blog-detail/${data?.id || ''}`}>
                        <h4>{data?.title || 'No Title'}</h4>
                    </Link>
                    <div className="text-wrap">
                        <p>
                            {data?.shortdescription || 'No description available.'}
                        </p>
                    </div>
                    <a className="blog_btn" href={`/blog-detail/${data?.id || ''}`}>See more<span className="ml-2 ti-arrow-right" /></a>
                </div>
            </div>
        </div>
    );
}

export default HomeBlogItem;
