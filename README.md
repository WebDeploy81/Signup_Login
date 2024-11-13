# Signup_Login
# ---------Signup-------------
# APIs
/user/register
Method type : Post
Take Parameter: Json object { name (string), email(string), password(string) role (integer)}
Role is defined as
1 for  Admin
2 for  Recruiter
3 for  Applicant
# ---------------------------
/user/login
Method type : Post
Take Parameter : Json object {email(string), password(string)}

