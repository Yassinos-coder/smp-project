import React, { useEffect, useState } from "react";
import "./Notifiyer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NotifyerModel from "../../../models/NotifyerModel";
import { useDispatch } from "react-redux";
import { sendNotif } from "../../../redux/NotifyerReducer";
const Notifiyer = () => {
  const dispatch = useDispatch();
  const [newNotif, setNewNotif] = useState(new NotifyerModel());
  useEffect(() => {
    const username = localStorage.userName
  }, []);

  return (
    <>
      <div className="MainNotifyer">
        <div className="NotifBody">
          <hr className="hr-notif-1" />
          <div className="sendNotifSpecificUsr">
            <div className="title-notifyer">
              <p>
                <FontAwesomeIcon icon={faArrowRight} className="faNotif" />
                Send Notifications To A Specific User :
              </p>
            </div>
            <div className="toUsr">
              <label htmlFor="user-reciever"> Enter the other person'S username :</label>
              <input type="text" name="user-reciever" placeholder="Ex: jhon.smp"  onChange={(e) =>{
                setNewNotif({...newNotif, notif_to_user: e.currentTarget.value})
              }}/>
            </div>
            <div className="message-subject">
              <label htmlFor="msg-sbjct">Enter subject of your message :</label>
              <input
                type="text"
                name="msg-sbjct"
                id="msg-sbjct"
                placeholder="Subject of message"
                onChange={(e) => {
                  setNewNotif({
                    ...newNotif,
                    notif_subject: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="msg-to-send">
              <p>Enter your message :</p>
              <textarea
                name="msg"
                id="msg"
                onChange={(e) => {
                  setNewNotif({
                    ...newNotif,
                    notif_msg: e.currentTarget.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="SendButton">
              <button
                type="submit"
                onClick={() => {
                  dispatch(sendNotif({ newNotif: newNotif }));
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifiyer;
