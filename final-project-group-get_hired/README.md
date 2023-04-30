[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0wrsx4Jb)
# GetHired

## Project Description

GetHired is a job search and career management portal for university students.

## Features

- Recruiters and Student can login using their valid credentials. Credentials are validated using JWT authentication.
- Students can create their profile and add documents such as resume.
- All documents are uploaded and maintained on Amazon S3
- Recruiters of companies post job openings that students can view and apply for.
  Career Fairs, Networking and Speaker events are posted on the portal and available for student booking
- Recruiters can view the applications and download the student's resumes.
- Used Google maps to display location of the event
- Students can filter on available jobs and events to find ones that interest them.
- Students can search for a job
- Students can post reviews about organizations for other students to peruse
- Students can access their dashboards to view their applications, registered events and job recommendations based on their interests.
- Used Charts.js to display the status of the applications on the student dashboard.

## User Stories

## Frontend

- Login Page - As a Student, I want to be able to login to my account so that I can access my personalized information and preferences - Swarali
- Signup Page - As a Student, I want to sign up and create my profile, so that my information can be shared with recruiters - Swarali
- Profile Page(studentview) - As a Student, I want to be able to view and edit my profile information so that I can manage my personal details - Swarali
- Employer Profile - As a student, I want to be able to View the company's profile page that showcases the company’s brand, culture, and job opportunities - Swarali
- Profile Page(Employer view) - As an recruiter, I want to be able to create and manage my company's profile page so that I can showcase our brand, culture, and job opportunities to potential candidates - Harshada
- Profile Page(Student view) - As a student, I want to be able to view and edit my profile information so that I can manage my personal details - harshada
- Add Job - As an recruiter, I want to be able to add a job opportunity on a user-friendly platform, so that I can attract potential candidates and easily manage my job listings - Harshada
- Delete Job posting - As a recruiter, I want to delete or inactivate a job posting, so that job opening that has been filled is not visible - Anupam
- Job Search Page - As a user, I want to be able to search for job openings on a user-friendly job search page, so that I can easily find relevant job opportunities and apply for them - Anupam
  -Home Page(Student view) - As a Student, I want to apply for job applications so that I can get a job and see my application status - Anupam
- Job Apply Page - As a Student, I want to filter job posting, so that I can find jobs related to my field/interest - Anupam
- Browse Events - As a Student, I want to filter events, so that I can attend events related to my field of interest - Sudharsan
- Review Page - As a Student, I want to add reviews about an organization, so that other fellow students can learn about my experience at an organization - Sudharsan
- Applications - As a recruiter, I want to view the recived applications and the student's profiles - Sudharsan

## Backend

### Anupam

-To create a new student</br>
-To create a new student</br>
-To update Student details</br>
-To delete a Student</br>
-To get all Students</br>
-To create a new recruiter</br>
-To get a Recruiter by id</br>
-To update Recruiter details</br>
-To delete a Recruiter</br>
-To get all recruiters</br>

### Swarali

-To create a new application</br>
-To get a application by id</br>
-To update application details</br>
-To delete a application</br>
-To get all applications</br>

### Sudharsan

-To create a new organization</br>
-To get a organization by id</br>
-To update organization details</br>
-To delete a organization</br>
-To get all organization</br>
-To create a new job</br>
-To get a job</br>
-To update job details</br>
-To delete a job</br>
-To get all jobs</br>

### Harshada

-To create a new project</br>
-To get a project by id</br>
-To update project details</br>
-To delete a project</br>
-To get all projects</br>
-To create a new registration</br>
-To get a registration by student id</br>
-To update registration details</br>
-To delete a registration</br>
-To get all registrations</br>

## Domain Model

![Domain Model](/assets/images/Domain_model.jpeg)

## Milestones

1 - Setting up the project and Creating UI/UX designs in Figma to get a better idea</br>
2 - Develop and implement Login, Sign up and User authentication,  authorization</br>
3 - User profiles creation for users and recruiters and implementing the APIs</br>
4 - Job Board creation to see all jobs and user should be able to post and apply to jobs</br>
5 - Testing and Deployment</br>


Milestone 1 -
Setting up the project and Creating UI/UX designs in Figma to get a better idea</br>
I should set up the basic project environment by installing required softwares</br>
I should create protypes of how the designs should look</br>
I should get a clear idea of the how the final product should look like</br>


Milestone 2 - 
Develop and implement Login, Sign up , user profiles and User authentication,  authorization</br>
As a user, I want to be able to create an account, so that I can log in to the app.</br>
As a user, I want to be able to log in to the app, so that I can access my profile and other features.</br>
As a user, I want to be able to log out of the app, so that my account is secure.</br>
As a user, I want to be able to reset my password, so that I can regain access to my account if I forget it.As a user, I want to be able to update my password, so that I can keep my account secure.</br>


Milestone 3 - 
User Profiles</br>
As a user, I want to be able to view my own profile, so that I can see my work experience, education, skills, and profile picture.</br>
As a user, I want to be able to edit my profile, so that I can add or update my personal information.As a user, I want to be able to view other users' profiles, so that I can learn more about them.</br>
As a user, I want to be able to search for other users by name, industry, or job title, so that I can find people who I want to connect with</br>

Milestone 4 - 
Job Board</br>
As a user, I want to be able to search for job opportunities by location, industry, and job title.</br>
As a user, I want to be able to apply for jobs with my profile information and resume.</br>
As a company, I want to be able to post job listings and receive applications from interested candidates.</br>


Milestone 5 - 
Testing and Deployment</br>
Perform unit testing and system testing to closely rectify if any bugs in the system</br>
Deploy it on the server</br>


### Instructions to Setup this Project <hr>

#### clone or download
```terminal
$ git clone https://github.com/neu-mis-info6150-spring-2023/final-project-group-get-hired.git
```

Server-side usage(PORT: 5000)
```terminal
$ cd backend   // go to client folder
$ npm i       // npm install pacakges
$ npm start   // run backend

Client-side usage(PORT: 3001)
```terminal
$ cd web-app   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally


