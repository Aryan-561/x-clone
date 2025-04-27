import React, { useEffect, useRef } from "react";
import { CreatePost, EventLoading } from "../../component";
import { MdClose } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ComposePost() {
  const navigate = useNavigate();
  const modalRef = useRef();
  const {loading} = useSelector(state=>state.post)

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate('/home');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white/20 flex flex-col items-center pt-16 "
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="w-[90%] sm:w-[60%] lg:w-[50%] rounded-2xl overflow-hidden text-white bg-black relative p-2"
      >
        <div className="flex items-center justify-center absolute left-3 top-2">
          <button
            onClick={() => navigate('/home')}
            className="text-lg hover:bg-white/20 rounded-full p-0.5"
          >
            <MdClose size={24} />
          </button>
        </div>
        <CreatePost classname={`border-none mt-4`} />
      </div>
      {loading && <EventLoading/>}
    </div>
  );
}

export default ComposePost;
