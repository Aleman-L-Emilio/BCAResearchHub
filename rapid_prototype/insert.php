<?php
    // Connect to the database
    $conn = new mysqli('soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com', 'ale_lew_mus', 'QS7FhtcdeLbm', 3306);

    // Get the values from the AJAX request
    project_id: 2, student_id: 1, title: 'SAMPLE_TITLE', abstract: 'SAMPLE_ABSTRACT', tags: 'SAMPLE_TAGS', research_paper: 'SAMPLE_PAPER', teacher_id: 1, teacher_email: 'matwan23@bergen.org'
    $project_id = $_POST["project_id"];
    $student_id = $_POST["student_id"];
    $title = $_POST["title"];
    $abstract = $_POST["abstract"];
    $tags = $_POST["tags"];
    $research_paper = $_POST["research_paper"];
    $teacher_id = $_POST["teacher_id"]
    $teacher_email = $_POST["teacher_email"]

    // Insert the values into the SQL table
    $sql = "INSERT INTO projects (project_id, student_id, title, abstract, tags, research_paper, teacher_id, teacher_email) VALUES ('$project_id', '$student_id', '$title', '$abstract', '$tags', '$research_paper', '$teacher_id', '$teacher_email')";
    $conn->query($sql);

    // Close the connection
    $conn->close();
?>