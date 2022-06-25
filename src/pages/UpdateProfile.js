import { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import WebPage from "../components/WebPage";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise
      .all(promises)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
        setError();
      });
  }

  return (
    <WebPage>
      <div className="slate-800">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100 fs-4" style={{ maxWidth: "500px" }}>
            <Card className="slate-700 text-slate-200">
              <Card.Body>
                <h2 className="text-center mb-4">Update profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      required
                      defaultValue={currentUser.email}
                    />
                  </Form.Group>
                  <Form.Group id="password" className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Leave blank to keep the same"
                    />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      placeholder="Leave blank to keep the same"
                    />
                  </Form.Group>
                  <br></br>
                  <Button disabled={loading} className="fs-5 generic-button w-100" type="submit">
                    Update profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <br></br>
            <div className="text-center">
              <Link className="generic-link" to="/profile">Cancel</Link>
            </div>
          </div>
        </Container>
      </div>
    </WebPage>
  );
}
