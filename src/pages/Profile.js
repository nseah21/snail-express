import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import WebPage from "../components/WebPage";

export default function Profile() {
  const { currentUser } = useAuth();
  return (
    <WebPage>
      <div className="slate-800">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100 fs-4 d-flex flex-column gap-4" style={{ maxWidth: "500px" }}>
            <Card className="slate-700 text-slate-200">
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
                <Link to="/update-profile" className="btn generic-button fs-5 w-100 mt-3">
                  Update profile
                </Link>
              </Card.Body>
            </Card>
            <div className="text-center">
              <Link className="generic-link" to="/dashboard">Back</Link>
            </div>
          </div>
        </Container>
      </div>
    </WebPage>
  );
}
