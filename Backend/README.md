# Signup_Login
# APIs
# ---------Signup-------------
/user/register<br/> 
Method type : Post<br/> 
Take Parameter: Json object { name (string), email(string), password(string) role (integer)}<br/> 
Role is defined as<br/> 
1 for  Admin<br/> 
2 for  Recruiter<br/> 
3 for  Applicant<br/> 
# -----------Login----------------
/user/login<br/> 
Method type : Post<br/> 
Take Parameter : Json object {email(string), password(string)}<br/> 
For Google Login API GET : /auth/google <br/>
For Linkedin Login API GET : /auth/linkedin <br/>


