import { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import WebPage from "../components/WebPage";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <WebPage>
      <div className="slate-800">
        <br />
        <Container className="d-flex justify-content-center">
          <div className="p-4 d-flex flex-column w-100 slate-700 text-slate-200 fs-4" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="fs-4" type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control className="fs-4" type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className="fs-4" type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <br></br>
              <Button disabled={loading} className="w-100 fs-4 generic-button" type="submit">
                Sign Up
              </Button>
            </Form>
            <br></br>
            <div className="text-center">
              Already have an account? Proceed to <Link className="generic-link" to="/Login">login</Link>
            </div>
            <div className="text-center">
              Back to <Link className="generic-link" to="/">home</Link>
            </div>
          </div>
        </Container>
        <br />
      </div>
    </WebPage>
  );
}

export default SignUp;
