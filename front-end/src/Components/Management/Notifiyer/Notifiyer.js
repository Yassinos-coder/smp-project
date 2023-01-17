import React, { useEffect, useState } from "react";
import "./Notifiyer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NotifyerModel from "../../../models/NotifyerModel";
import { useDispatch } from "react-redux";
import { sendNotif } from "../../../redux/NotifyerReducer";
import NotifRoleModel from "../../../models/NotifRoleModel";
import { sendNotifByRole } from "../../../redux/NotifRoleReducer";
const Notifiyer = () => {
  const dispatch = useDispatch();
  const [newNotifData, setNewNotif] = useState(new NotifyerModel());
  const [newNotifRole, setNewNotifRole] = useState(new NotifRoleModel())
  const username = localStorage.getItem('userName');
  const role = localStorage.role_name
  useEffect(() => {
    setNewNotif({ ...newNotifData, notif_from_user: username });
    setNewNotifRole({...newNotifRole, notif_from_user: username})
  },[])


  const handleroleselect = (event) => {
    let roleSelect = event.target.options[event.target.selectedIndex].value;
    setNewNotifRole({...newNotifRole, notif_to_role: roleSelect})
  }
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
                  Send Notifications To A Role Group :
                </p>
              </div>
              <div className="toUsr">
                <label htmlFor="user-reciever">
                  To whom you wish to send a message ?
                </label>
                <select className="inputs-adacnt" name="roleSelec" id="roleSelec" onChange={(event) =>{handleroleselect(event)}}>
                  <option value="Student">Students</option>
                  <option value="Teacher">Teachers</option>
                  <option value="Staff">Staffs</option>
                </select>
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
                    setNewNotifRole({
                      ...newNotifRole,
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
                    setNewNotifRole({
                      ...newNotifRole,
                      notif_msg: e.currentTarget.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="SendButton">
                <button
                  type="submit"
                  onClick={() => {
                    dispatch(sendNotifByRole(newNotifRole));
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
