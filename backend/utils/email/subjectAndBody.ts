export const signupSubject = "Accounted Created Successful";
export const signupBody = `Dear student, <br> Your account has been created <br>Please wait for the verification from the Training and Placement cell or you can contact your T&amp;P faculty coordinator for fast approval <br><br> Regards,<br> ViMEET T&amp;P <br> 7070416209`;
export const verificationSubject = "Account verification successful";
export const verificationBody = `Dear Student, <br>Your account has been verified, You can login in to your account and update your information <br> <br>Regards,<br>TPO Vishwaniketan iMEET <br>7070416209`;
export const adminAccountCreationbody = (fullName: string, password: string) =>
  `Dear ${fullName} <br>, You have been added in vishwaniketan CMS, Your password is ${password}. You can login on the portal and manage the content. <br>Regards,<br>TPO Vishwaniketan iMEET <br>7070416209`;
export const adminAccountCreationsubject="Welcom in vishwaniketan"