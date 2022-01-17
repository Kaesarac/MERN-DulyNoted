import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/api/notes");
      setNotes(data);
    }
    fetchData();
  }, []);

  return (
    <MainScreen title="Welcome Back Ao Ghast!">
      <Link to="createNote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }}>
          Note Something Duly
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id} flush>
          <Accordion.Item eventKey="0">
            <Card style={{ margin: 10 }}>
              <Accordion.Header as={Card.Text} variant="link">
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                      padding: "5px 10px 5px 5px",
                    }}
                  >
                    {" "}
                    {note.title}
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
              </Accordion.Header>
              <Accordion.Body>
                <Card.Body>
                  <h5>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h5>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created On - date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
