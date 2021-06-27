import { useEffect, useState } from 'react';
import { getUsersWithPhoto } from '../../api/users';
import User from '../../models/user';
import "./entities.scss";
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import FilterListIcon from '@material-ui/icons/FilterList';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import AddIcon from '@material-ui/icons/Add';
import Condition from '../../models/condition';
const Entities = () => {

    const [users = [], setUsers] = useState<User[]>();
    const [listLayout, setLayoutList] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [fullScreen, changeFullscreen] = useState<boolean>(false);
    const [conditions = [], setConditions] = useState<Condition[]>();
    const setLayout = (layout: boolean): void => setLayoutList(layout);
    const [propertyType, setPropertyType] = useState<string>("And");
    const [allUsers = [], setAllUser] = useState<User[]>();
    let id: number = 0;

    useEffect(() => {
        getUsersWithPhoto().then(users => {
            setAllUser(users);
            setUsers(users);
        });
    }, [allUsers.length]);
    const onFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
        const search = event.currentTarget.value;
        const filteredUsers = [...allUsers].filter(q => q.name.toLowerCase().includes(search.toLowerCase()));
        setUsers(filteredUsers);

    }
    const pushCondition = () => {
        var cond = new Condition();
        cond.id = id++;
        cond.field1 = propertyType;

        var conds = [...conditions];
        conds.push(cond);

        setConditions(conds);
    }
    const sortItems = () => {
        const sortedItems = [...users].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setUsers(sortedItems);
    }

    const handleChangeProperty = (e: React.FormEvent<HTMLSelectElement>) => {
        setPropertyType(e.currentTarget.value);
    }
    
    const handleChangeTypeProperty = (e: React.FormEvent<HTMLSelectElement>, index: number) => {
        const newConditions = [...conditions];
        newConditions[index].field2 = e.currentTarget.value;
        setConditions(newConditions);
    }


    return (
        <div className={fullScreen ? "fullscreen entities-page" : "entities-page"}>
            <div className="top-bar">
                <div>
                    <h1>Entities <SettingsIcon className="icon" onClick={() => { setShowSettings(!showSettings) }} /></h1>
                    <div className="button-layout-container">
                        <button onClick={() => { setLayout(true) }} disabled={listLayout} className={!listLayout ? "" : 'active'}>
                            <ListIcon />  List
                        </button>
                        <button onClick={() => { setLayout(false) }} disabled={!listLayout} className={listLayout ? "" : 'active'}>
                            <AppsIcon />   Mosaic
                        </button>
                    </div>
                </div>
                <div className={showSettings ? "settings visible" : "settings hidden"} >
                    <div className="left-wrapper">
                        <div className="select-wrapper">
                            <AccessibilityIcon />
                            <select disabled>
                                <option>All</option>
                            </select>
                        </div>
                        <div className="container">
                            <MoreHorizIcon />
                        </div>
                        <div className="container" onClick={() => { sortItems() }}>
                            <SortByAlphaIcon />
                            <span>Sort</span>
                        </div>
                        <div className="container" onClick={() => { setShowFilters(!showFilters) }}>
                            <FilterListIcon />
                        Filter
                        </div>
                        <div onClick={() => { changeFullscreen(!fullScreen) }} className="container">
                            <FullscreenIcon />
                        </div>
                        <div className="container" onClick={() => {navigator.clipboard.writeText("http://localhost:3000/entities")}}>
                            <ShareIcon />
                            <span>Share</span>
                        </div>
                    </div>
                    <div className="right-wrapper">
                        <div className="input-wrapper">
                            <input type="text" placeholder="Filter by name..." onChange={onFilterChange} />
                            <SearchIcon />
                        </div>
                        <div className="items">
                            <RssFeedIcon />
                            <span>All items</span>
                        </div>
                    </div>

                    <div className={showFilters ? "filters visible" : "filters hidden"} >
                        <span> Rows are filtered by the following conditions starting from the top.</span>
                        {
                            conditions.map((c, i) => {

                                return (
                                    <div className="conditionals-wrapper" key={c.id}>
                                        <span>{c.field1}</span>
                                        <select>
                                            <option>Status</option>
                                            <option>Company</option>
                                        </select>
                                        <select value={c.field2} onChange={e => handleChangeTypeProperty(e, i)}>
                                            <option value="Contains">Contains</option>
                                            <option value="Is">Is</option>
                                            <option value="Ends">Ends before</option>
                                        </select>
                                                                                   
                                        <input type="text" disabled placeholder={c.field2 !== "Ends" ? "Type..." : "Date"} />
                                        <select style={c.field2 === "Contains" ? {display: "none"} : {}}>
                                            <option>In</option>
                                            <option>Not in</option>
                                        </select>
                                        <input type="text" disabled placeholder="Entity..." style={c.field2 === "Contains" ? {display: "none"} : {}} />
                                    </div>
                                );
                            })
                        }
                        {}
                        <div className="add-condition">
                            <AddIcon onClick={() => { pushCondition() }} />
                                <span onClick={() => { pushCondition() }}>Add filter</span>
                                <select placeholder="chooose property" onChange={e => handleChangeProperty(e)}  value={propertyType}>
                                <option value="And">And</option>
                                <option value="Where">Where</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* "user-data-wrapper" */}
            <div className="content">
                <div className={"user-data-wrapper " + (listLayout ? "list-layout" : "mosaic-layout")}>
                    {
                        users.map((d, i) => {
                            return (
                                <div className="user-data" key={i}>
                                    <div className="user-img">
                                        <img src={d.userPhoto} alt="" />
                                    </div>
                                    <div className="data">
                                        <span className="name">{d.name}</span>
                                        <span className="address">Cancas 1050, Distrito Capital, Venezuela</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}


export default Entities;
