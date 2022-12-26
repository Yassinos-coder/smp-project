import React, { useEffect, useState } from "react";
import "./Notifiyer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NotifyerModel from "../../../models/NotifyerModel";
import { useDispatch } from "react-redux";
import { sendNotif } from "../../../redux/NotifyerReducer";
import NotifRoleModel from "../../../models/NotifRoleModel";
const Notifiyer = () => {
  const dispatch = useDispatch();
  const [newNotifData, setNewNotif] = useState(new NotifyerModel());
  const [newNotifRole, setNewNotifRole] = useState(new NotifRoleModel())
  const username = localStorage.getItem('userName');
  useEffect(() => {
    setNewNotif({ ...newNotifData, notif_from_user: username });
  },[newNotifData,username])


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
                <label htmlFor="user-reciever">
                  Enter the other person'S username :
                </label>
                <input
                  type="text"
                  name="user-reciever"
                  placeholder="Ex: jhon.smp"
                  onChange={(e) => {
                    setNewNotif({
                      ...newNotifData,
                      notif_to_user: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="message-subject">
                <label htmlFor="msg-sbjct">
                  Enter subject of your message :
                </label>
                <input
                  type="text"
                  name="msg-sbjct"
                  id="msg-sbjct"
                  placeholder="Subject of message"
                  onChange={(e) => {
                    setNewNotif({
                      ...newNotifData,
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
                      ...newNotifData,
                      notif_msg: e.currentTarget.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="SendButton">
                <button
                  type="submit"
                  onClick={() => {
                    console.log(newNotifData);
                    dispatch(sendNotif(newNotifData));
                  }}
                >
                  Send Message
                </button>
              </div>
          </div>
          {/* Send Notif By role  */}
          <div className="sendNotifRole">
              <div className="title-notifyer">
                <p>
                  <FontAwesomeIcon icon={faArrowRight} className="faNotif" />
                  Send Notifications To A Specific User :
                </p>
              </div>
              <div className="toUsr">
                <label htmlFor="user-reciever">
                  Enter the other person'S username :
                </label>
                <input
                  type="text"
                  name="user-reciever"
                  placeholder="Ex: jhon.smp"
                  onChange={(e) => {
                    setNewNotif({
                      ...newNotifData,
                      notif_to_user: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="message-subject">
                <label htmlFor="msg-sbjct">
                  Enter subject of your message :
                </label>
                <input
                  type="text"
                  name="msg-sbjct"
                  id="msg-sbjct"
                  placeholder="Subject of message"
                  onChange={(e) => {
                    setNewNotif({
                      ...newNotifData,
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
                      ...newNotifData,
                      notif_msg: e.currentTarget.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="SendButton">
                <button
                  type="submit"
                  onClick={() => {
                    console.log(newNotifData);
                    dispatch(sendNotif(newNotifData));
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
