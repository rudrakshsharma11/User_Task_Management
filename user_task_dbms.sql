use final_exam;
-- Create the Task Assignment Information table
CREATE TABLE task_assignment (
    task_assigned_id INT AUTO_INCREMENT PRIMARY KEY,
    taskid INT,
    userid INT,
    FOREIGN KEY (taskid) REFERENCES Task(taskid) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (userid) REFERENCES User_info(userid) ON DELETE CASCADE ON UPDATE CASCADE
);



-- Create the User_info table
CREATE TABLE User_info (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    ProfilePicture VARCHAR(255)
);

-- Create the Task Information table
CREATE TABLE Task (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Priority INT,
    Deadline DATE,
    Status VARCHAR(50)
);

-- Create the Task Assignment Information table
CREATE TABLE TaskAssignment (
    TaskID INT,
    UserID INT,
    FOREIGN KEY (TaskID) REFERENCES Task(TaskID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserID) REFERENCES User_info(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (TaskID, UserID)
);



select * from user_info;
select * from task;
select * from taskassignment
