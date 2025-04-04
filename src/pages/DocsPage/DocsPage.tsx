import React from "react";
import "./DocsPage.css";

const DocsPage = () => {
  return (
    <div className="user-manual-container">
      <h1>Athenaeum User Manual</h1>

      <section>
        <h2>Introduction</h2>
        <p>Welcome to Athenaeum, an online platform for managing courses, materials, and communication between students and professors.</p>
      </section>

      <section>
        <h2>User Roles</h2>
        <ul>
          <li><strong>Students:</strong> Can enroll in courses, view materials, and receive notifications.</li>
          <li><strong>Professors:</strong> Can create and manage courses, upload materials, and send notifications.</li>
          <li><strong>Admin:</strong> Has full control over the platform, including user and course management.</li>
        </ul>
      </section>

      <section>
        <h2>Managing Courses</h2>
        <p>Professors can create new courses, add descriptions, and categorize them using keywords.</p>
      </section>

      <section>
        <h2>Uploading & Viewing Materials</h2>
        <p>Materials can be uploaded by professors and accessed by students in respective courses.</p>
      </section>

      <section>
        <h2>Notifications & Messages</h2>
        <p>Users receive notifications for new materials and announcements. Professors and students can communicate via messages.</p>
      </section>

    </div>
  );
};

export default DocsPage;
