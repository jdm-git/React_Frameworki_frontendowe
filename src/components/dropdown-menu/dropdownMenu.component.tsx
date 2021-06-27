import { FC, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import User from '../../models/user';
import { getUser } from '../../api/users';
import Photo from '../../models/photo';
import { getPhotoById } from '../../api/photos';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import './dropdownMenu.scss'

interface IDropdownMenuComponentProps {

}

const DropdownMenuComponent: FC<IDropdownMenuComponentProps> = () => {

    const userId: number = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };


    const [user = new User(), setUser] = useState<User>();
    useEffect(() => {
        getUser(userId).then(response => { setUser(response.data); });
    }, [user.id]);

    const [photo = new Photo(), setPhoto] = useState<Photo>();
    useEffect(() => {
        getPhotoById(userId).then(response => { setPhoto(response.data) });
    }, [photo.id]);


    const platform: ElementContainer[] = [
        new ElementContainer("home", "Home", "/home"),
        new ElementContainer("note", "Publications"),
        new ElementContainer("apartment", "Entities", "/entities"),
        new ElementContainer("emoji_events", "Administration")
    ];

    const workspaces: ElementContainer[] = [
        new ElementContainer("assignment", "Client contract"),
        new ElementContainer("apartment", "Corporate"),
        new ElementContainer("assignment", "Supplier contract"),
        new ElementContainer("book", "Group norms"),
        new ElementContainer("assignment", "Real Estate contracts")
    ]

    return (
        <div id="dropdown">
            <div className="dropdown-input">
                <input type="text" placeholder="filter...." onChange={handleChange} value={searchTerm} />
                <SearchIcon />
            </div>
            <div className="first-column">
                <div className="platform">
                    <h3>Platform</h3>
                    {platform
                        .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(({ icon, name, redirect }) => {
                            return (
                            <Link to={redirect}>
                                <div className="element-container">
                                    <Icon>{icon}</Icon>
                                    <span>{name}</span>
                                </div>
                            </Link>
                            );
                        })}
                </div>

                <div className="workspaces">
                    <h3>Workspaces</h3>
                    {workspaces
                        .filter(f => f.name.includes(searchTerm))
                        .map(({ icon, name, redirect }) => {
                            return (
                                <Link to={redirect}>
                                    <div className="element-container">
                                        <Icon>{icon}</Icon>
                                        <span>{name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
            <div className="user-wrapper">
                <div className="image-container">
                    <img src={photo.thumbnailUrl} alt="thumbnail"/>
                </div>
                <Link to="profile">
                <div className="user-data">
                    <span className="name">{user.name}</span>
                    <span>See profile</span>
                </div>
                </Link>
            </div>

            <div className="logout-wrapper">
                <ExitToAppIcon />
                <span>Logout</span>
            </div>
        </div>

    );
}

class ElementContainer {
    public icon: string = "";
    public name: string = "";
    public redirect: string;
    constructor(icon: string, name: string, redirect: string | undefined = undefined) {
        this.icon = icon;
        this.name = name;
        this.redirect = redirect ? redirect : "/404";
    }
}

export default DropdownMenuComponent;