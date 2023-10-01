class NotifRoleModel {
    constructor (notif_from_user= '', notif_to_role='', notif_subject='', notif_msg='', read='false'){
     this.notif_from_user = notif_from_user
     this.notif_to_role = notif_to_role
     this.notif_subject = notif_subject
     this.notif_msg = notif_msg
     this.read = read
    }
 }
 
 export default NotifRoleModel