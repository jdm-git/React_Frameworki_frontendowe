import { AxiosResponse } from 'axios';
import React, { useState, useEffect, FC } from 'react';
import { getPostsWithLimit } from '../../api/posts';
import Post from '../../models/post';
import './resumeComponent.scss';
import SearchIcon from '@material-ui/icons/Search';
import RssFeedIcon from '@material-ui/icons/RssFeed';
interface IResumeComponentProps {
    userId: number;
}

const ResumeComponent: FC<IResumeComponentProps> = ({ userId }) => {
    const pageSize = 10;
    const limit = 100;
    const lastPage = Math.ceil(limit / pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [posts = [], setPosts] = useState<Post[]>();
    const [filteredPosts = [], setFilteredPosts] = useState<Post[]>();
    const [pages = [], setPages] = useState<number[]>();
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const search = event.currentTarget.value;
        setSearchTerm(search);
        if (search) setFilteredPosts(posts.filter(f => f.title.toLowerCase().includes(search)))
        else {
            setPage(1);
            setFilteredPosts(posts.slice((currentPage - 1) * pageSize, pageSize * currentPage));
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const setPage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (currentPage < 3) setPages([2, 3]);
        if (currentPage > 2 && currentPage < (lastPage - 1))
            setPages([currentPage - 1, currentPage, currentPage + 1]);
        if (currentPage > 8) setPages([8, 9]);
    }, [currentPage, lastPage]);

    useEffect(() => {
        setFilteredPosts(posts.slice((currentPage - 1) * pageSize, pageSize * currentPage));
    }, [currentPage, posts]);

    useEffect(() => {
        getPostsWithLimit(limit).then((response: AxiosResponse<Post[]>) => {
            setPosts(response.data);
            setFilteredPosts(response.data.slice((currentPage - 1) * pageSize, pageSize * currentPage));
        });
    }, [posts.length, currentPage]);



    return (
        <div className="resume-component">
            <div className="filters">
                <div className="options">
                    <div className="input-container">
                        <input 
                         type="text" 
                         placeholder="Filter by title..." 
                         onChange={handleChange} 
                         value={searchTerm} 
                        />
                        <SearchIcon className="search" />
                    </div>
                    <div className="follow">
                        <RssFeedIcon />
                        <span> Followed </span>
                    </div>
                </div>
            </div>
            {
                filteredPosts
                    .map((element: Post) => {
                        return (
                            <div className="card">
                                <h3>{element.title}</h3>
                                <p>{element.body}</p>
                                <div>
                                    <span> Subsid. corp.</span>
                                    <span>Supplier contract</span>
                                    <span>Updated 3 days ago by John Doe</span>
                                </div>
                            </div>
                        );
                    })}

            <div 
             className="pagination" 
             style={searchTerm ? { display: "none" } : { display: "block" }}
            >
                <button 
                 disabled={currentPage <= 1} 
                 style={currentPage > 1 ? { color: "#6464e6" } : { color: "gray", cursor: "unset" }} 
                 onClick={previousPage}
                >Previous</button>
                <button 
                 onClick={() => { setCurrentPage(1) }} 
                 disabled={currentPage === 1} 
                 style={currentPage === 1 ? { color: "gray" } : { color: "#6464e6" }}
                >1</button>
                <span 
                 style={currentPage < 3 ? { display: 'none' } : { display: 'inline' }}
                > ... </span>
                {pages.map(d => {
                    return (
                        <button 
                         onClick={() => { setCurrentPage(d) }} 
                         disabled={currentPage === d} 
                         style={currentPage === d ? { color: "gray" } : { color: "#6464e6" }}
                        >{d}</button>
                    );
                })}
                <span 
                 style={currentPage > 8 ? { display: 'none' } : { display: 'inline' }}
                > ... </span>
                <button 
                 style={currentPage === lastPage ? { color: "gray" } : { color: "#6464e6" }} 
                 disabled={currentPage === lastPage} 
                 onClick={() => { setCurrentPage(lastPage) }}
                >{lastPage}</button>
                <button 
                 disabled={currentPage >= lastPage} 
                 style={currentPage < lastPage ? { color: "#6464e6" } : { color: "gray", cursor: "noneu" }} 
                 onClick={nextPage}
                >Next</button>
            </div>

        </div>
    );
}


export default ResumeComponent;