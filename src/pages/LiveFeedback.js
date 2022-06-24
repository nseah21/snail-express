import {
  Button,
  Card,
  Dropdown,
  DropdownButton,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useClass } from "../contexts/ClassContext";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";

const LiveFeedback = () => {
  const { currentClass, isTutor } = useClass();
  const { currentUser } = useAuth();
  const [results, setResults] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);

  const reactions = ["fast", "slow", "confusing", "good"];
  const variants = ["danger", "info", "warning", "success"];
  const feedbackRef = collection(
    firestore,
    "classes",
    currentClass.id,
    "feedback"
  );

  const handleSubmit = (event, reaction) => {
    setLoading(true);
    setDoc(doc(feedbackRef, `${new Date().getTime()}`), {
      reaction: reaction,
      user: currentUser.displayName,
    }).then(() => setLoading(false));
  };

  const handleReset = () => {
    setLoading(true);
    getDocs(feedbackRef)
      .then((snapshot) => {
        snapshot.docs.map((docu) => {
          const docRef = doc(feedbackRef, docu.id);
          deleteDoc(docRef).then(() => console.log("Deleted " + docu.id));
        });
      })
      .then(() => setLoading(false));
  };

  onSnapshot(feedbackRef, (snapshot) => {
    const arr = [0, 0, 0, 0];
    snapshot.docs.map((doc) => {
      arr[reactions.indexOf(doc.data().reaction)] += 1;
    });
    setResults(arr);
  }).then(() => console.log("Refreshing")).catch(error => console.log(error));

  const sum = (arr) => arr.reduce((x, y) => x + y, 0);

  return (
    <>
      <NavigationBar />
      <Card
        className="d-flex align-items-center mt-5"
        style={{ margin: "auto", maxWidth: "900px", minHeight: "350px" }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          title="Submit feedback"
          className="mt-4"
        >
          {reactions.map((reaction) => {
            return (
              <Dropdown.Item
                onClick={(event) => handleSubmit(event, reaction)}
                key={reaction}
              >
                {reaction}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <br></br>
        <div>
          {!loading ? (
            reactions.map((reaction) => {
              const percentage =
                sum(results) == 0
                  ? 0
                  : Math.round(
                      (results[reactions.indexOf(reaction)] / sum(results)) * 100
                    );
              return (
                <div key={reaction}>
                  <ProgressBar
                    style={{
                      minHeight: "30px",
                      minWidth: "400px",
                      maxWidth: "800px"
                    }}
                    animated
                    now={percentage}
                    label={`${percentage}%`}
                    variant={variants[reactions.indexOf(reaction)]}
                  />
                  <div className="fs-5">
                    {results[reactions.indexOf(reaction)] +
                      " out of " +
                      sum(results) +
                      " find the lecture "}
                    <strong>{reaction}</strong>
                  </div>
                </div>
              );
            })
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </Card>
      <br></br>
      <div className="d-flex align-items-center">
        {isTutor() ? (
          <Button
            onClick={handleReset}
            style={{ margin: "auto", minWidth: "400px" }}
          >
            Reset responses
          </Button>
        ) : (
          <div></div>
        )}{" "}
      </div>
    </>
  );
};

export default LiveFeedback;
