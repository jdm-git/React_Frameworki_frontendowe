import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PersonIcon from "@material-ui/icons/Person";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { useEffect, useState } from "react";
import { getPhotoById } from "../../api/photos";
import { getUser } from "../../api/users";
import Photo from "../../models/photo";
import User from "../../models/user";
import "./profile.scss";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

const Profile = () => {
  const userId: number = 3;
  const [user, setUser] = useState<User>();
  const [userDataEditorEnabled, setUserDataEditor] = useState<boolean>(false);
  const [userDetailsEnabled, setDetail] = useState<boolean>(false);
  useEffect(() => {
    getUser(userId).then((usr) => {
      setUser(usr.data);
    });
  }, [user?.id]);

  const [photo = new Photo(), setPhoto] = useState<Photo>();
  useEffect(() => {
    getPhotoById(userId).then((response) => {
      setPhoto(response.data);
    });
  }, [photo.id]);

  const [expertisesClear, setExpertisesClear] = useState<string[]>([]);
  const [specialitiesClear, setSpecialitiesClear] = useState<string[]>([]);
  const [admissionsClear, setAdmissionsClear] = useState<string[]>([]);
  const [countriesClear, setCountriesClear] = useState<string[]>([]);
  const [expertises, setExpertises] = useState<string[]>([
    "Manage and acquisition",
  ]);
  const [specialities, setSpecialities] = useState<string[]>([
    "Cross border operation",
    "Transactions over 500M€/$",
  ]);
  const [admissions, setAdmissions] = useState<string[]>([
    "Paris bar association",
    "Tunisian bar association",
  ]);
  const [countries, setCountries] = useState<string[]>(["Tunisia"]);

  const enableEditDetails = (): void => {
    if (!userDetailsEnabled) {
      setExpertisesClear([...expertises]);
      setSpecialitiesClear([...specialities]);
      setAdmissionsClear([...admissions]);
      setCountriesClear([...countries]);
    } else {
      setExpertises(expertisesClear);
      setSpecialities(specialitiesClear);
      setAdmissions(admissionsClear);
      setCountries(countriesClear);
    }
    setDetail(!userDetailsEnabled);
  };

  const saveDetails = (): void => {
    //TODO: PUT ON SAVE

    setDetail(!userDetailsEnabled);
  };

  const handleChangeExpertise = (index: number, value: string) => {
    var clone = [...expertises];
    clone[index] = value;
  };
  const proposals = [
    {
      name: "International exchange",
      entity: "123",
      location: "Germany",
      expertise: "#It",
      date: "2017-12-02",
      firm: "Technica",
    },
    {
      name: "Advertisement",
      entity: "123",
      location: "Poland",
      expertise: "#Marketing",
      date: "2015-01-12",
      firm: "Advertise Corp",
    },
    {
      name: "Cooperation",
      entity: "123",
      location: "Denmark",
      expertise: "#Sales",
      date: "2019-11-12",
      firm: "Mentils",
    },
  ];
  const reviews = [
    {
      name: "International exchange",
      entity: "123",
      location: "Germany",
      expertise: "#It",
      date: "2017-12-02",
    },
    {
      name: "Advertisement",
      entity: "123",
      location: "Poland",
      expertise: "#Marketing",
      date: "2015-01-12",
    },
    {
      name: "Cooperation",
      entity: "123",
      location: "Denmark",
      expertise: "#Sales",
      date: "2019-11-12",
    },
  ];

  return (
    <div className="Profile">
      <div className="container">
        <div className="info-row">
          <div className="elements">
            <ChatBubbleOutlineIcon />
            <span>Message</span>
          </div>
          <div className="elements">
            <FormatAlignJustifyIcon />
            <span>Create a request</span>
          </div>
          <div className="elements">
            <InsertDriveFileIcon />
            <span>Add a cluster</span>
          </div>
        </div>
        <div className="user-wrapper">
          <div className="left-column">
            <div>
              <img src={photo.thumbnailUrl} alt="thumbnail" />
            </div>
            <span>See profile</span>
          </div>
          <div className="right-column">
            <div className="edit-wrapper">
              <button className="edit">
                {userDataEditorEnabled ? <SaveIcon /> : null}
              </button>
              <button
                className="edit"
                onClick={() => {
                  setUserDataEditor(!userDataEditorEnabled);
                }}
              >
                {userDataEditorEnabled ? <CloseIcon /> : <EditIcon />}
              </button>
            </div>
            <input
              type="text"
              disabled={!userDataEditorEnabled}
              value={user?.name}
            />
            <input
              type="text"
              disabled={!userDataEditorEnabled}
              value={user?.username}
            />
            <div>
              <div>
                <input
                  type="text"
                  disabled={!userDataEditorEnabled}
                  value={user?.company.name}
                />
                <input
                  type="text"
                  disabled={!userDataEditorEnabled}
                  value={user?.website}
                />
              </div>
              <div>
                <select disabled={!userDataEditorEnabled}>
                  <option>Contractor</option>
                  <option>Partner</option>
                </select>
                <input
                  type="text"
                  disabled={!userDataEditorEnabled}
                  value={user?.phone}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="details">
          <div className="edit-wrapper">
            <button
              className="edit"
              onClick={() => {
                saveDetails();
              }}
            >
              {userDetailsEnabled ? <SaveIcon /> : null}
            </button>
            <button
              className="edit"
              onClick={() => {
                enableEditDetails();
              }}
            >
              {userDetailsEnabled ? <CloseIcon /> : <EditIcon />}
            </button>
          </div>

          <div>
            <h2>Expertise</h2>
            <div className="details-input-wrapper">
              {expertises.map((e, i) => {
                return (
                  <input
                    type="text"
                    value={e}
                    onChange={(e) => {
                      handleChangeExpertise(i, e.currentTarget.value);
                    }}
                    key={i}
                    disabled={!userDetailsEnabled}
                  />
                );
              })}
              {userDetailsEnabled ? (
                <button onClick={() => setExpertises(expertises.concat(""))}>
                  <AddIcon />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <h2>Specialities</h2>
            <div className="details-input-wrapper">
              {specialities.map((e, i) => {
                return (
                  <input
                    type="text"
                    value={e}
                    key={i}
                    disabled={!userDetailsEnabled}
                  />
                );
              })}
              {userDetailsEnabled ? (
                <button
                  onClick={() => {
                    setSpecialities(specialities.concat(""));
                  }}
                >
                  <AddIcon />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <h2>Admissions</h2>
            <div className="details-input-wrapper">
              {admissions.map((e, i) => {
                return (
                  <input
                    type="text"
                    value={e}
                    readOnly
                    key={i}
                    disabled={!userDetailsEnabled}
                  />
                );
              })}
              {userDetailsEnabled ? (
                <button onClick={() => setAdmissions(admissions.concat(""))}>
                  <AddIcon />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <h2>Countries</h2>
            <div className="details-input-wrapper">
              {countries.map((e, i) => {
                return (
                  <input
                    type="text"
                    value={e}
                    readOnly
                    key={i}
                    disabled={!userDetailsEnabled}
                  />
                );
              })}
              {userDetailsEnabled ? (
                <button onClick={() => setCountries(countries.concat(""))}>
                  <AddIcon />{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="panelInformations">
          <h1 className="infoTitle">Panel Informations</h1>
          <label>Hourly fee</label>
          <div className="content">610$/hour (Negociated)</div>
          <label>Terms & conditions</label>
          <div className="content">
            Monthly 10k$ retainer - see with Jeanny Smith
          </div>
          <div className="attachment">Attachment_lorem_ipsum12345.jpg</div>
        </div>
        <div className="servicesAndProject">
          <h1 className="infoTitle">Services And Projects</h1>
          <div>Corporate M&A and international acquisitions</div>
          <div className="content">Internal correspondants</div>
          <div className="correspondants">
            <div className="userRecord">
              <div>
                <span>
                  <img src={photo.thumbnailUrl} alt="thumbnail" />
                  {user?.name}
                </span>
                <span>
                  <ChatBubbleOutlineIcon style={{ verticalAlign: "middle" }} />
                  Message
                </span>
                <span>
                  <PersonIcon style={{ verticalAlign: "middle" }} />
                  Profile
                </span>
              </div>
            </div>
            <div className="userRecord">
              <div>
                <span>
                  <img src={photo.thumbnailUrl} alt="thumbnail" />
                  {user?.name}
                </span>
                <span>
                  <ChatBubbleOutlineIcon style={{ verticalAlign: "middle" }} />
                  Message
                </span>
                <span>
                  <PersonIcon style={{ verticalAlign: "middle" }} />
                  Profile
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="proposals">
          <h1 className="infoTitle">Proposals</h1>
          <table>
            <thead>
              <th>Name</th>
              <th>Entity</th>
              <th>Location</th>
              <th>Expertise</th>
              <th>Date</th>
              <th>Firm</th>
            </thead>
            <tbody>
              {proposals.map((p) => {
                return (
                  <tr>
                    <td>{p.name}</td>
                    <td>{p.entity}</td>
                    <td>{p.location}</td>
                    <td>{p.expertise}</td>
                    <td>{p.date}</td>
                    <td>{p.firm}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="reviews">
          <h1 className="infoTitle">Internal reviews</h1>

          <table>
            <thead>
              <th>Name</th>
              <th>Entity</th>
              <th>Location</th>
              <th>Expertise</th>
              <th>Date</th>
            </thead>
            <tbody>
              {reviews.map((r) => {
                return (
                  <tr>
                    <td>{r.name}</td>
                    <td>{r.entity}</td>
                    <td>{r.location}</td>
                    <td>{r.expertise}</td>
                    <td>{r.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
