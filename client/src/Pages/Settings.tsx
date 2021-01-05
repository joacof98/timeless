import React, { useContext, useState, ChangeEvent } from "react";
import { Segment, Card, Input, Header, Image, Button, Loader, Dimmer } from "semantic-ui-react";
import { AuthContext } from "../util/auth";
import {updateProfile} from "../util/requests"
import {storage} from '../firebase/firebase'
import "../Css/Settings.css";

const Settings: React.FC = () => {
  const { user, updateUserInfo } = useContext(AuthContext);
  const [imageAsFile, setImageAsFile] = useState(null);
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState<Boolean>(false)
  const [usernameToChange, setUsernameToChange] = useState<String>('')
  const [loader, setLoader] = useState<Boolean>(false)

  const fileUploadButton = () => {
    document.getElementById("fileButton").click();
  };

  const handleImageAsFile = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    if (!image.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      setErrors({ imgError: 'Please, upload only an image.'})
    } else {
      setImageAsFile(image);
    }
  };

  const handleUserToChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameToChange(e.target.value)
  }

  const confirmUpdate = async () => {
    if(imageAsFile) {
      setLoader(true)
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((url) => {
            sendInfoToDB(url)
          });
      });
    } else sendInfoToDB('')
  }

  const sendInfoToDB = async (url: String) => {
    const res = await updateProfile(
      { username: usernameToChange, imageUrl: url },
      user.username
    );
    setLoader(false)
    if(res.error) {
      setSuccessMsg(false)
      setErrors(res.error)
    } else {
      updateUserInfo(res)
      setErrors('')
      setSuccessMsg(true)
    }
  };

  return (
    <div>
      <Segment id="settingsCover" vertical textAlign="center">
        <Card id="cardSettings">
          {loader && (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          )}
          <Card.Content>
            <Header as="h1" id="titleCard">
              Settings
            </Header>
            <Card.Meta>
              <span className="date">Change your profile information</span>
            </Card.Meta>
            <Card.Description>
              <Image
                height="250px"
                width="250px"
                src={user.imageUrl}
                circular
              />
            </Card.Description>
            <input
              type="file"
              id="fileButton"
              onChange={handleImageAsFile}
              hidden
            />
            <Button
              id="btnUpload"
              style={{ marginTop: "15px" }}
              onClick={fileUploadButton}
            >
              Upload
            </Button>
          </Card.Content>

          {imageAsFile && imageAsFile.name}
          <Card.Content>
            <Header id="titleCard" as="h4">
              Change your username:
            </Header>
            <Input
              icon="user"
              iconPosition="left"
              placeholder="Enter new username"
              onChange={handleUserToChange}
            />
            <Button
              id="btnUpload"
              onClick={confirmUpdate}
              style={{ marginLeft: "10px" }}
            >
              Confirm
            </Button>
            {Object.keys(errors).length > 0 && !successMsg && (
              <div className="ui error message" id="extraMsg">
                <ul className="list">
                  {Object.values(errors).map((value: any) => (
                    <li key={value}>
                      <b>{value}</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {successMsg && (
              <div className="ui success message" id="extraMsg">
                <b>Updated succesfully!</b>
              </div>
            )}
          </Card.Content>
        </Card>
      </Segment>
    </div>
  );
};

export default Settings;
