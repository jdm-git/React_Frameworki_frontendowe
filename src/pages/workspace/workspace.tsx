import { useParams } from "react-router";
import "./workspace.scss";
import bgImage from "../../assets/images/fun.jpg";
import { useState } from "react";
import { useEffect } from "react";
import ResumeComponent from "../../components/resume/resume.component";

import Icon from "@material-ui/core/Icon";
interface IWorkspaceParams {
  id: string;
}
const Workspace = () => {
  const workspaces: Works[] = [
    {
      id: 1,
      name: "Client Contract",
      icon: "receipt",
    },
    {
      id: 2,
      name: "Supplier Contract",
      icon: "assignment",
    },
    {
      id: 3,
      name: "Corporate",
      icon: "home",
    },
  ];
  const { id } = useParams<IWorkspaceParams>();
  // const workspace = workspaces[parseInt(id)];

  const [workspace, setWorkspace] = useState<Works>();
  useEffect(() => {
    console.log(parseInt(id));
    const work = workspaces.find((q) => q.id.toString() === id);
    setWorkspace(work);
  }, [id]);
  return (
    <div className="workspace">
      <div className="header">
        <div className="header-image">
          <img src={bgImage} alt="bg" />
        </div>
        <div className="header-content">
          <div className="icon-wrapper">
            <Icon>{workspace?.icon}</Icon>
          </div>
          <div className="content">
            <h3>{workspace?.name}</h3>
            <p>
              Vivamus rutrum gravida scelerisque. Maecenas feugiat placerat enim
              vel dictum. Integer maximus, arcu ac varius elementum, lorem nulla
              mattis tortor, ac sollicitudin mauris lectus sed lorem.{" "}
            </p>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        <h3>Latest updates</h3>
        <ResumeComponent userId={2} />
      </div>
    </div>
  );
};

class Works {
  id!: number;
  name!: string;
  icon!: string;
}

export default Workspace;
