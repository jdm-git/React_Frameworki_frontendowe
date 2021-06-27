import { Icon } from '@material-ui/core';
import { FC } from 'react';
import Workspace from '../../models/workspace';
import "./workspace.scss";

interface IWorkspaceComponentProps {
    workspace: Workspace;
}

const WorkspaceComponent: FC<IWorkspaceComponentProps> = ({ workspace }) => {
    return (
        <div className="workspace-component">
            <div className="background"  style={{backgroundImage: `url(${workspace.backgroundImage})`}}>
            </div>

            <div className="content-wrapper">
                <div className="img-container">
                    <Icon>{workspace.typeIcon}</Icon>
                </div>
                <p>{workspace.title}</p>
            </div>

            <div className="info-wrapper">
                <div>
                    <Icon>{workspace.typeIcon}</Icon>
                    <span>{workspace.type}</span>
                </div>
                <span>
                    .
                </span>
                <div>
                    <Icon>group</Icon>
                    <span>{workspace.usersCount} users</span>
                </div>
            </div>
            <p className="update">Last update {workspace.update} ago</p>
        </div>
    );
}



export default WorkspaceComponent;