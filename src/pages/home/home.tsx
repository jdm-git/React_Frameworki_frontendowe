import { useState, useEffect } from 'react';
import { getUser, getUserPostsById } from '../../api/users';
import { getPhotoById } from '../../api/photos';
import User from "../../models/user";
import './homePage.scss';

import Photo from '../../models/photo';
import Post from '../../models/post';
import ResumeComponent from '../../components/resume/resume.component';
import Workspace from '../../models/workspace';
import WorkspaceComponent from '../../components/workspace/workspace.component';
import { Link } from 'react-router-dom';

const Home = () => {
    const userId: number = 1;
    const [user = new User(), setUser] = useState<User>();

    useEffect(() => {
        getUser(userId).then(response => { setUser(response.data); });
    }, [user.id]);

    const [photo = new Photo(), setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(userId).then(response => { setPhoto(response.data) });
    }, [photo.id]);

    const [bigPost, setBigPost] = useState<Post>();
    const [posts = [], setPosts] = useState<Post[]>();

    useEffect(() => {
        getUserPostsById(userId, 1).then(response => {
            setBigPost(response.data[0]);
        });
    }, [bigPost?.id]);


    useEffect(() => {
        getUserPostsById(userId, 3).then(response => {
            setPosts(response.data);
        });
    }, [posts.length]);

    const workspaces = [
        new Workspace(1,"https://media.istockphoto.com/photos/business-people-working-at-a-modern-office-picture-id1150572095?s=612x612", "Client contract", "Contract", "2 days", 150),
        new Workspace(2,"https://media.istockphoto.com/photos/woman-sketching-a-business-plan-at-a-creative-office-picture-id912338074?s=612x612", "Supplier contract", "Contract", "2 days", 25),
        new Workspace(3,"https://media.istockphoto.com/photos/business-people-working-at-a-modern-office-picture-id1150572095?s=612x612", "Corporate", "Corporate", "2 days", 25),
        new Workspace(4,"https://media.istockphoto.com/photos/business-people-working-at-a-modern-office-picture-id1150572095?s=612x612", "Client contract", "Contract", "2 days", 150),
        new Workspace(5,"https://media.istockphoto.com/photos/woman-sketching-a-business-plan-at-a-creative-office-picture-id912338074?s=612x612", "Supplier contract", "Contract", "2 days", 25),
        new Workspace(6,"https://media.istockphoto.com/photos/business-people-working-at-a-modern-office-picture-id1150572095?s=612x612", "Corporate", "Corporate", "2 days", 25)
    ]

    return (
        <div className="Home">
            <div className="bigger-column column">
                <div className="big-card">
                    <div className="image-container" style={{ backgroundImage: `url(${photo.url})` }}>
                        <div className="gradient-container">
                            <h2> {bigPost?.title}</h2>
                            <div className="author">
                                <span> 7 jan. 2020</span>
                                <div className="profile-image">
                                    <img src={photo.thumbnailUrl} alt="profile_picture" />
                                </div>
                                <span>{user.name} </span>
                            </div>
                        </div>
                    </div>
                    <div className="publication-container">
                        <h3>Latest Publications</h3>
                        <div className="">

                            {posts.map(element => {
                                return (

                                    <div className="post-container" >
                                        <div className="small-image-container">
                                            <img src={photo.thumbnailUrl} alt="thumbnail" />
                                        </div>
                                        <div className="info-container">
                                            <h4>{element.title}</h4>
                                            <div className="author">
                                                <span> 7 jan. 2020</span>
                                                <div className="profile-image">
                                                    <img src={photo.thumbnailUrl} alt="profile_picture" />
                                                </div>
                                                <span>{user.name} </span>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                            <span className="see-more">See more publications</span>
                        </div>
                    </div>
                </div>
                <div className="workspaces-wrapper">
                    <h3>Workspaces</h3>
                    <div className="workspace-container">
                        {workspaces.map(w => {
                            return (
                                <Link to={'workspace/' + w.id}>
                                    <WorkspaceComponent workspace={w} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="resume">
                    <h2>Resume your work</h2>

                    <ResumeComponent userId={2} />
                </div>
            </div>
        </div>
    );



}


export default Home;