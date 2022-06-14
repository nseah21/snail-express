import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import NavigationBar from "./NavigationBar";

export default function Profile() {
  const { currentUser } = useAuth();
  return (
    <>
      <NavigationBar />
      <Card>
        <Card.Body>
          {/* <img src={logo} className="img-responsive" alt="Website logo" height="150px" /> */}
          <h2 className="text-center mb-4">Profile</h2>
          <div>
            <strong>Name:</strong> Insert name here after linking database
          </div>
          <div>
            <strong>Email:</strong> {currentUser.email}
          </div>
          <div>
            <strong>Enrolled course:</strong> CP2106  
          </div>
          <div>
            <strong>Role:</strong> Student
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update profile
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}