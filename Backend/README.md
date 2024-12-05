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
Here’s the complete **API Endpoints Table** for all categories:

---

### **API Endpoints Table**

| **Category**             | **Action**                 | **Method** | **Endpoint**                     | **Description**                                                 |
|--------------------------|----------------------------|------------|----------------------------------|-----------------------------------------------------------------|
| **Personal Information** | View                       | GET        | `/personal/view`                 | Retrieve the applicant's personal information.                  |
|                          | Update                     | PUT        | `/personal/update`               | Update the applicant's personal information.                    |
| **Skills**               | View All                   | GET        | `/skills/view`                   | Retrieve all skills associated with the applicant.              |
|                          | Add                        | POST       | `/skills/add`                    | Add a new skill to the applicant's profile.                     |
|                          | Update                     | PUT        | `/skills/update`                 | Update a specific skill by skill ID.                            |
|                          | Delete                     | DELETE     | `/skills/delete`                 | Delete a skill by skill ID.                                     |
| **Experience**           | View All                   | GET        | `/experience/view`               | Retrieve all experiences associated with the applicant.         |
|                          | Add                        | POST       | `/experience/add`                | Add a new experience to the applicant's profile.                |
|                          | Update                     | PUT        | `/experience/update`             | Update a specific experience by experience ID.                  |
|                          | Delete                     | DELETE     | `/experience/delete`             | Delete an experience by experience ID.                          |
| **Education**            | View All                   | GET        | `/education/view`                | Retrieve all education details of the applicant.                |
|                          | Add                        | POST       | `/education/add`                 | Add new education details to the applicant's profile.           |
|                          | Update                     | PUT        | `/education/update`              | Update a single education entry by its ID.                      |
|                          | Update in Bulk             | PUT        | `/education/updateBulk`          | Update multiple education entries in bulk.                      |
|                          | Delete                     | DELETE     | `/education/delete`              | Delete a single education entry by its ID.                      |
|                          | Delete in Bulk             | DELETE     | `/education/deleteBulk`          | Delete multiple education entries in bulk.                      |
| **Profile**              | View Entire Profile        | GET        | `/profile/view`                  | Retrieve the entire profile of the applicant.                   |
|                          | Create                     | POST       | `/profile/create`                | Create a new profile for the applicant.                         |
| **File Upload**          | View CV Upload Workflow    | GET        | `/file/view-upload-cv`           | View the CV upload workflow.                                    |
|                          | View Profile Picture Upload| GET        | `/file/view-profile-pic`         | View the profile picture upload workflow.                       |
|                          | Upload CV                  | POST       | `/file/upload-cv`                | Upload a CV in PDF format.                                      |
|                          | Upload Profile Picture     | POST       | `/file/upload-profile-pic`       | Upload a profile picture in JPEG or PNG format.                 |
| **Activity**             | View All Activities        | GET        | `/activity/view`                 | View all activities associated with the applicant.              |
|                          | Upload                     | POST       | `/activity/update`               | Upload activity details in JSON format.                         |
| **Achievement**          | View All Achievements      | GET        | `/achievement/view`              | View all achievements associated with the applicant.            |
|                          | Upload                     | POST       | `/achievement/update`            | Upload achievement details in JSON format.                      |
| **Project**              | View All Projects          | GET        | `/project/view`                  | View all projects associated with the applicant.                |
|                          | Upload                     | POST       | `/project/update`                | Upload project details in JSON format.                          |
| **Certificates**         | View All Certificates      | GET        | `/certificate/view`              | View all certificates associated with the applicant.            |
|                          | Add                        | POST       | `/certificate/update`            | Add a new certificate to the profile.                           |
| **Research Publication** | View All Research          | GET        | `/research_publication/view`     | View all research publications associated with the applicant.   |
|                          | Add                        | POST       | `/research_publication/update`   | Add a new research publication.                                 |
| **Conference & Seminars**| View All Entries           | GET        | `/conferences_seminars/view`     | View all conference and seminar entries.                        |
|                          | Add                        | POST       | `/conferences_seminars/update`   | Add a new conference or seminar entry.                          |
| **Domain Interest**      | View All Interests         | GET        | `/domain_intrest/view`           | View all domain interests associated with the applicant.        |
|                          | Add                        | POST       | `/domain_intrest/update`         | Add a new domain interest.                                      |
| **Expertise Areas**      | View All Expertise Areas   | GET        | `/expertise_area/view`           | View all expertise areas associated with the applicant.         |
|                          | Add                        | POST       | `/expertise_area/update`         | Add a new expertise area.                                       |
| **Languages**            | View All Languages         | GET        | `/language/view`                 | View all languages known by the applicant.                      |
|                          | Add                        | POST       | `/language/update`               | Add a new language.                                             |
| **Patent**               | View All Patents           | GET        | `/patent/view`                   | View all patents associated with the applicant.                 |
|                          | Add                        | POST       | `/patent/update`                 | Add a new patent.                                               |
| **Profile Summary**      | View Profile Summary       | GET        | `/profile_summery/view`          | View the profile summary of the applicant.                      |
|                          | Add/Update                 | POST       | `/profile_summery/update`        | Add or update the profile summary.                              |
| **Hobbies**              | View All Hobbies           | GET        | `/hobbie/view`                   | View all hobbies associated with the applicant.                 |
|                          | Add                        | POST       | `/hobbie/update`                 | Add a new hobby.                                                |
| **References**           | View All References        | GET        | `/reference/view`                | View all references associated with the applicant.              |
|                          | Add                        | POST       | `/reference/update`                 | Add a new reference.                                         |

--- 

This table provides a **comprehensive list of all endpoints**, categorized by functionality, with their actions, methods, endpoints, and brief descriptions.


