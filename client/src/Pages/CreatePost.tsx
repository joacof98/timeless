import React, { useState, ChangeEvent } from "react";
import "../Css/Posts.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Card,
  Form,
  Segment,
  Header,
  Accordion,
  Icon,
  Button,
} from "semantic-ui-react";
import {storage} from '../firebase/firebase'
import {createPost} from '../util/requests'

const CreatePost: React.FC = () => {
  const [index, setIndex] = useState<string>("");
  const [file, setFile] = useState(null);
  const [userInput, setUserInput] = useState({
    title: '',
    description: ''
  })
  const [videoError, setVideoError] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false)

  const fileUploadButton = (media_id: string) => {
    document.getElementById(media_id).click();
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0];
    if (!image.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      setImageError("Please, upload only an image.");
    } else {
      setFile(image);
      setImageError('')
    }
  };

  const handleVideoFile = (e: ChangeEvent<HTMLInputElement>) => {
    const video = e.target.files[0];
    if (!video.type.match('video.*')) {
      setVideoError("Please, upload only an video.");
    } else {
      setFile(video);
      setVideoError('')
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value: any): void => {
    setUserInput({ ...userInput, description: value });
  };

  const handleOptClick = (value: string) => {
    setIndex(value);
  };

  const submitForm = () => {
    if(file) {
      setLoader(true)
      const category = file.type.match('video.*') ? 'videos' : 'images'
      setLoader(true)
      const uploadTask = storage.ref(`/${category}/${file.name}`).put(file)
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref(category)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            sendInfoToDB(url, category)
          });
      });
    } else sendInfoToDB('', '')
  }

  const sendInfoToDB = async (url: string, category: string) => {
    const imageUrl = category === 'images' ? url : ''
    const videoUrl = category === 'videos' ? url : ''
    const res = await createPost({
      title: userInput.title,
      description: userInput.description,
      imageUrl: imageUrl,
      videoUrl: videoUrl
    })
    setLoader(false)
    console.log(res)
  }

  return (
    <div>
      <Segment id="postsCover" style={{ height: "680px" }}>
        <Card id="formCard">
          <Form noValidate>
            <Header as="h1" id="titleForm">
              Create a new Post
            </Header>
            <Header as="h4" id="timeless-font">
              And remember, this is your only chance in a whole month. Make it
              worth it.
            </Header>

            <Form.Input
              icon="edit"
              iconPosition="left"
              label="(*) Title"
              placeholder="Enter the title"
              name="title"
              onChange={handleTextChange}
            />

            <b>
              <p style={{ marginBottom: "5px" }}>Description</p>
            </b>
            <ReactQuill onChange={handleQuillChange} />

            <b>
              <p style={{ marginTop: "10px" }}>Media</p>
            </b>
            <Accordion styled>
              <Accordion.Title
                active={index === "img"}
                onClick={() => handleOptClick("img")}
              >
                <Icon name="dropdown" />
                Image
              </Accordion.Title>

              <Accordion.Content active={index === "img"}>
                <input
                  type="file"
                  id="fileButtonImg"
                  onChange={handleImageFile}
                  hidden
                />
                <Button
                  id="btnCreate"
                  size="small"
                  onClick={() => fileUploadButton("fileButtonImg")}
                >
                  Upload Image
                </Button>
                {imageError && (
                  <p id="error-message">
                    <b>{imageError}</b>
                  </p>
                )}
              </Accordion.Content>

              <Accordion.Title
                active={index === "vid"}
                onClick={() => handleOptClick("vid")}
              >
                <Icon name="dropdown" />
                Video
              </Accordion.Title>

              <Accordion.Content active={index === "vid"}>
                <input
                  type="file"
                  id="fileButtonVideo"
                  onChange={handleVideoFile}
                  hidden
                />
                <Button
                  id="btnCreate"
                  size="small"
                  onClick={() => fileUploadButton("fileButtonVideo")}
                >
                  Upload Video
                </Button>
                {videoError && (
                  <p id="error-message">
                    <b>{videoError}</b>
                  </p>
                )}
              </Accordion.Content>
            </Accordion>

            <Button id="btnCreate" size="big" onClick={submitForm}>
              Submit
            </Button>
            {file && file.name}
          </Form>
        </Card>
      </Segment>
    </div>
  );
};

export default CreatePost;
