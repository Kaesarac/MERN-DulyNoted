import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Badge, Button, Card, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, successCreate, navigate, userInfo, successUpdate]);

  return (
    <MainScreen title={`Welcome Back!`}>
      <Link to="createNote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }}>
          Note Something Duly
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

      {loading && <Loading />}
      {notes?.reverse().map((note) => (
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
                    <Stack direction="horizontal" gap={3}>
                      <div className="bg-light border ms-auto">
                        {note.title}
                      </div>
                      <div className="bg-light border">
                        {" "}
                        <Button href={`/note/${note._id}`}>Edit</Button>
                      </div>
                      <div className="vr" />
                      <div className="bg-light border">
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Stack>
                  </span>

                  <div></div>
                </Card.Header>
              </Accordion.Header>
              <Accordion.Body>
                <Card.Body>
                  <h5>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h5>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
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
