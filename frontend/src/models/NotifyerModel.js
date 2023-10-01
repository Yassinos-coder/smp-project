class NotifyerModel {
   constructor (notif_from_user= '', notif_to_user='', notif_subject='', notif_msg='', read='false'){
    this.notif_from_user = notif_from_user
    this.notif_to_user = notif_to_user
    this.notif_subject = notif_subject
    this.notif_msg = notif_msg
    this.read = read
   }
}

export default NotifyerModel