import React, { useState, useRef, useEffect } from "react";
import { Button, Container } from "../index.js";
import Avatar from "../Card/Avatar.jsx";
import Media from "../Card/Media.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postSlice.js";
import { MdClose } from 'react-icons/md';
import { useNavigate, useLocation } from "react-router-dom";
import { createComment, createReplyComment } from "../../features/index.js";

function CreatePost({classname, isPost=true, forReply=false}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState(null);
  const [media, setMedia] = useState(null);

  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const user = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch();
  const {post} = useSelector(state=>state.post)
  const {commentByid} = useSelector(state=>state.comment)

  const mediaPreview = {
    url: preview,
    resourseType: type,
  };

  const handleFile = (file) => {
// console.log(fileInputRef)
    setType(file.type.split("/")[0]);
    setMedia(file)
    const reader = new FileReader();
    reader.onloadend = () => {
// console.log(reader)
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };


  const handleOnSubmit =  () => {
    if(isPost){
      dispatch(createPost({ text, media }))
      setText("")
      setPreview(null)
      setMedia(null)
      setType(null)
      location.pathname=="/compose/post"?navigate('/home'):""
    }
    else{
      if(forReply){
        const commentId = commentByid._id
        dispatch(createReplyComment({commentId, text}))
      }
      else{
      const postId = post?._id
      dispatch(createComment({postId, text}))
    }
    setText("")
  }
}

  const handleOnRemoveMedia = (e)=>{
    e.preventDefault()
    setPreview(null)
    setMedia(null)
    setType(null)
  }

  const  handleDefalut = ()=>{
    alert('This Feature comming soon!')
  }
  

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to the new height based on content
    }
  }, [text]); // Re-run when text changes
  
  return (
    <>
      <Container className={`border-y border-gray-600 ${classname}`}>
        <div
          className={` px-1 py-2`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex gap-4 py-4 justify-center">
            <Avatar userDetails={user?.data} />
            <div className={`w-[80%] h-auto  overflow-y-scroll scrollbar-thumb-only pr-4 ${isPost?"min-h-20 sm:min-h-36 max-h-52 sm:max-h-72":"min-h-16 max-h-40 sm:max-h-48 "}`}>
              <textarea
                ref={textAreaRef}
                value={text}
                maxLength={220}
                onChange={handleTextChange}
                className="placeholder:font-normal text-sm  sm:text-xl resize-none w-full border-none focus:outline-none overflow-hidden"
                placeholder={`${isPost?"What's happening?":"Post your reply"}`}
              ></textarea>
              <div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                {preview && 
                (<div className="relative">
                  <div className="absolute top-2 right-2">
                    <Button onBtnClick={handleOnRemoveMedia}><MdClose className="bg-white/20  cursor-pointer p-1 rounded-full z-1 hover:scale-105 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" size={24} /></Button>
                  </div>
                  <Media media={mediaPreview} />
                </div>)}
              </div>
            </div>
          </div>
          <div className={`flex  mx-2 px-2 sm:px-4  items-center border-t-1 border-gray-500 pt-2 ${isPost?"justify-between":"justify-end-safe"}`}>
            <div className={`flex gap-1 sm:gap-3 ${isPost?"block":"hidden"}`}>
              <Button
                floatingText="Media"
                classname="cursor-pointer"
                onBtnClick={(e) => fileInputRef.current.click()}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 sm:w-6 fill-sky-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                >
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </Button>

              <Button  onBtnClick={handleDefalut}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 sm:w-6 fill-sky-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                >
                  <g>
                    <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                  </g>
                </svg>
              </Button>

              <Button  onBtnClick={handleDefalut}>
                <svg
                  viewBox="0 0 33 32"
                  aria-hidden="true"
                  className="w-5 sm:w-6 fill-sky-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                >
                  <g>
                    <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
                  </g>
                </svg>
              </Button>

              <Button  onBtnClick={handleDefalut}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="fill-sky-500 w-5 sm:w-6 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                >
                  <g>
                    <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path>
                  </g>
                </svg>
              </Button>

              <Button  onBtnClick={handleDefalut}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="fill-sky-500 w-5 sm:w-6 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                >
                  <g>
                    <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                  </g>
                </svg>
              </Button>

              <Button onBtnClick={handleDefalut}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="fill-sky-500 w-5 sm:w-6 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03"
                >
                  <g>
                    <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path>
                  </g>
                </svg>
              </Button>
            </div>
            <Button
              className="bg-white p-1 text-xs px-2 sm:px-4 sm:text-lg text-black rounded-3xl font-semibold cursor-pointer  disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={text?false:true}
              onBtnClick={handleOnSubmit}
            >
              {isPost?"Post":"Reply"}
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CreatePost;
