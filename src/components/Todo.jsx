import "../index.css";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBook, faXmark, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [heading, setHeading] = useState("Your Todo Heading");
  const [description, setDescription] = useState(
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, mollitia!"
  );
  const [tasks, setTasks] = useState([]);

  const headingName = useRef(null);
  const descriptionName = useRef(null);

useEffect(() => {
  const storedNotes = JSON.parse(localStorage.getItem('tasks'))
  if (storedNotes) {
      setTasks(storedNotes);
    }
  }, [])

  useEffect(() => {
    if(tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else{
      localStorage.removeItem('tasks')
    }
  }, [tasks]);


  const handleTasks = () => {
    const headingValue = headingName.current.value;
    const descriptionValue = descriptionName.current.value;
    setTasks((prevValue) => [
      ...prevValue,
      {
        heading: headingValue,
        description: descriptionValue,
      },
    ]);
    headingName.current.value = ""
    descriptionName.current.value = ""
    closePopup()
  };
  const closePopup = () => {
    const popUpBox = document.getElementById("popup");
    popUpBox.classList.add("hidden");
  };

  const openPopUp = () => {
    const popUpBox = document.getElementById("popup");
    popUpBox.classList.remove("hidden");
  };
const removeBox = (index) => {
  const updatedNotes = tasks.filter((_, i) => i !== index);
  setTasks(updatedNotes)
}

const mainSec = document.getElementById('main')
if(tasks.length > 0) {
  mainSec.classList.add('h-screen')
}

  return (
    <>
      <div id="main" className="mainContainer h-screen flex w-full flex-col bg-gray-950">
        <div className="headingContainer  p-8 bg-gray-800 flex justify-between">
          <div className="heading">
            <h2 className="headingText text-white text-xl font-medium font-sans ">
              NoteNest - A Notes Taking React App
            </h2>
          </div>
          <div className="button">
            <button
              onClick={openPopUp}
              className="taskAdd bg-white px-2 py-2 text-black border-none rounded-md"
            >
              <FontAwesomeIcon icon={faPlus} className="px-1" /> Add New Note
            </button>
          </div>
        </div>
        <div className="todoContainer">
          <div
            id="popup"
            className="popupbox fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm hidden flex justify-center items-center z-50"
          >
            <div className="bg-gray-900 text-white w-96 p-5 flex flex-col justify-center h-96 relative rounded-md">
              <h1 className="text-lg font-bold mb-3">Add Task</h1>
              <hr className="bg-gray-400" />
              <div className="taskInputs mt-4 flex flex-col justify-center items-center">
                <div>
                  <label htmlFor="">Note Heading</label>
                  <input
                    type="text"
                    ref={headingName}
                    className=" text-white bg-black focus:outline-none rounded-lg my-3 w-80 p-2"
                    
                  />
                </div>
                <div>
                  <label htmlFor="">Note Description</label>
                  <textarea
                    ref={descriptionName}
                    className=" text-white bg-black resize-none focus:outline-none rounded-lg my-3 p-2 w-80"
                  ></textarea>
                </div>
              <div>
                <button
                  onClick={handleTasks}
                  className="addToTask w-80 my-3 p-2 border-none text-white rounded-md bg-black"
                >
                  Add Now
                </button>
                </div>
              </div>
              <FontAwesomeIcon onClick={closePopup}
                id="closePopup"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 cursor-pointer" icon={faXmark} />
              
            </div>
          </div>
          <div className="mainTodoBox p-8">
            <div className="headingT text-2xl text-white">Your Notes</div>
            <div className="todoBoxes flex custom650:flex-col custom650:items-center justify-center border-none p-4 rounded-md my-3">
              {tasks.length > 0 ? (
                tasks.map((item, index) => (
                  <div
                    key={index}
                    className="todoBox m-3 flex flex-col justify-between text-gray-200 bg-gray-900 rounded-md w-72 p-3"
                  >
                    <div className="icon py-3">
                      <FontAwesomeIcon icon={faBook} className="text-lg" />
                    </div>
                    <div className="upper">
                      <h2 className="pb-4 font-medium text-2xl">
                        {item.heading}
                      </h2>
                      <hr className="bg-gray-600"/>
                      <p className="mt-3">{item.description}</p>
                    </div>
                    <div className="lower pt-10 ">
                      <button className="editBtn text-white px-1 text-lg rounded-md py-2">
                      <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        onClick={() => removeBox(index)}
                        className="deleteBtn text-white px-1 text-lg rounded-md py-2"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-white text-center text-2xl">
                    No Notes Here
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
