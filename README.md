# EC2 Instance: http://ec2-3-137-177-115.us-east-2.compute.amazonaws.com/~ehedden/calendar.html

Accounts created: 

user: test1 pass: test1

user: test3 pass: test3

user: emmy pass: emmy

This calendar website displays a month-by-month view of the calendar, with buttons to move forward or backward. Users can register and log in to the website.
Registered users can add events, with a date and time, and can edit and delete their own events. All user and event data is kept in a MySQL database. The application uses AJAX to run server-side scripts that query the MySQL database to save and retrieve information, including user accounts and events.
User registration, user authentication, event addition, and event deletion is handled by JavaScript and AJAX requests to the server.

Additional Features:

    - Tags

        - Events with tags can be added and edited

        - Events display with their associated tag

        
    - Share Events
    
        - Users can share an event with another user, by pressing "Share Above Event" button
        
        - The shared event pops up in the other users calendar
    
    - Share Calendar
        
        - Users can share their calendar with another user, by filling out the user they would like to share it with
        
        - All events get copied to the other users calendar
       
        
    
