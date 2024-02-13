# FC-soen341projectW2024

## Car Rental Application
![image](https://github.com/shanvinluo/FC-soen341projectW2024/assets/107290656/44d37f1e-fe43-454e-a5cc-ee40c007662e) <br>
_Home page of Web app Designed on Figma by Lina Taalba_

### Objective
The objective of this project is to become familiar with the software development process by developing a middle-fidelity prototype of a car rental application. Users can browse through vehicles that they want to rent and reserve them through the platform. Other features will be implemented to help facilitate the reservation process for the customers as well. Agile development (4 sprints) will be the software development methodology to implement the web application.   

### Overview
This repository hosts the source code for a middle-fidelity prototype of a car rental application designed to streamline the process of renting vehicles for short periods. The application acts as a platform connecting customers seeking rental vehicles with the car rental company offering these services. <br>
<br>
The core features are: 
1. Browse Vehicles for Rent: Customers can explore a comprehensive catalog of available rental vehicles, filtering by type (e.g., cars, SUVs, vans, trucks), category (e.g., compact, standard, intermediate), and price range.
2. Start a Reservation: By providing location details (postal code, city, or airport) and pickup/return dates, customers can initiate a reservation process. The system presents available vehicles matching specified criteria for selection.
3. Customizable Reservations: During the reservation process, customers have the option to add extra equipment to their booking, with additional costs clearly outlined.
4. Manage Reservations: Customers can conveniently view, modify, or cancel their reservations as needed, ensuring flexibility in their rental plans.
5. Find Nearest Branch: Customers can input a postal code or airport location to locate the nearest rental branch, facilitating convenient pickup and return of vehicles.
6. Rating and Review: After completing a rental, customers have the opportunity to provide feedback and ratings for the rented vehicle and overall rental experience, contributing to transparency and improving service quality.
<br> An additional feature:
8. Phone alerts: Customers can get phone alerts for their reservations via SMS. 

### Installation
1. Clone the Repository: ```git clone git@github.com:your_username/FC-soen341projectW2024.git``` <br>
<strong>** Note </strong>: Replace ```your_username``` with your actual GitHub username.

2. Install Dependencies:
* Make sure you have Python installed on your system.
* Navigate to the project directory: ```cd FC-soen341projectW2024```
* Create a virtual environment: ```python -m venv venv```
* Activate the virtual environment:
* On Windows: ```venv\Scripts\activate```
** On macOS and Linux: ```source venv/bin/activate```
** Install dependencies: ```pip install -r requirements.txt```
3. Run the Application:
* Set the Flask app environment variable:
* On Windows: ```set FLASK_APP=app.py```
* On macOS and Linux: ```export FLASK_APP=app.py```
* Start the Flask development server: ```flask run```
4. Access the Application: Navigate to ```http://localhost:5000 in your web browser.``` <br>
<strong>** Note </strong>: Ensure that no other application is running on port 5000 on your local machine. 

### Repository Structure
The repository will be split into 4 sprint folders. All of those folders will include the code done during and before the sprint, the meeting minutes, the documentation needed as well as a detailed log of each member's activity. User stories and plans for the next sprint can be found in the wiki. 

### [Wiki](https://github.com/shanvinluo/FC-soen341projectW2024/wiki) Contents Table
* [Git Rules for the Project](https://github.com/shanvinluo/FC-soen341projectW2024/wiki/Git-rules-for-the-project.)
* [Label Rules](https://github.com/shanvinluo/FC-soen341projectW2024/wiki/Label-rules)
* [Team managment rules and project management.](https://github.com/shanvinluo/FC-soen341projectW2024/wiki/Team-managment-rules-and-project-management.)


### Languages and Technology used (Stack)
* Frontend: React
* Backend and deployment: Python and Flask
* DBMS: PostgreSQL
* Architecture: Microservices architectural pattern

### Contributors and roles
* <strong> Shanvin Luo (40248485) (github.com/shanvinluo) </strong>: Product Manager, Full-Stack Developer: <br>
As the Product Manager, I oversee the strategic development and execution of our car rental website, managing all aspects of its development while also actively participating in full-stack coding to ensure a seamless and robust application.
* <strong> Mamadou Kaba (27070179) (github.com/mdkaba) </strong>: QA Front-End, Mainly Frontend Developer: <br>
As QA Frontend, I will be the main person reviewing, commenting, and approving the frontend-related codes. Whilst I will be involved in all coding processes, I will mainly be working on the front-end aspect.  
* <strong> Lina Taalba (40250168) (github.com/ltaalba) </strong>: Frontend Designer, Mainly Frontend Developer, Secretary: <br>
As the Frontend Designer, I craft visually appealing and intuitive user interfaces for our car rental website, ensuring an exceptional user experience across all devices and platforms. Whilst I will be involved in all coding processes, I will mainly be working on the front-end aspect. As secretary, I am also one of the people in charge of the meeting notes. 
* <strong> Idris Drouiche (40247290 (github.com/IdrisDrouiche) </strong>: QA Security and swing, Full-Stack Developer: <br>
As QA security, I will mainly focus on reviewing, commenting, approving, and detecting code that might have security breaches/issues, as a swing I will also provide support to QA Front-end and back-end if needed. I will also actively participate in full-stack coding to ensure a seamless and robust application.
* <strong> Atai Askarov (40248327) (github.com/Atai-Askarov) </strong>: Mainly Backend Developer, Documentation Coordinator and Website Architecture: <br>
As the Documentation Coordinator, I oversee the review and organization of our documentation, ensuring clarity and accessibility. Additionally, I manage and create the website architecture to optimize usability and functionality. Whilst I will be involved in all coding processes, I will mainly be working on the back-end aspect.
* <strong> Michael Shokralla (40209659) (github.com/Mike67911) </strong>: QA Backend, Mainly Backend Developer, Secretary: <br>
As QA Frontend, I will be the main person reviewing, commenting, and approving the backend-related codes. Whilst I will be involved in all coding processes, I will mainly be working on the back-end aspect. As secretary, I am also one of the people in charge of the meeting notes. 


### Contributing
Contributions are welcome! Please follow these guidelines:

* Fork the repository and create a new branch.
* Make your changes and ensure the codebase passes linting and tests.
* Submit a pull request with a clear description of your changes.
