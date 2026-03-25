import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { NoteContext } from "../context/NoteContent";
import { toast } from "react-toastify";
import axios from "axios";
import { BsPin } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const Dashboard = () => {
  const { userName, navigate, backendUrl, search } = useContext(NoteContext);

  console.log(search);

  const [addNote, setAddNote] = useState(false);
  const [tag, setTag] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

  const [fetchNotes, setFetchNotes] = useState([]);

  const [searchNotes, setSearchNotes] = useState([]);

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  // I Have to make it
  useEffect(() => {
    const searchFetch = async () => {
      try {
        const response = await axios.get(backendUrl + "/getnotes", {
          withCredentials: true,
        });
        let notes = response.data.allNotes;
        setSearchNotes(notes);
        if (search.trim()) {
          notes = notes.filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase()),
          );

          setFetchNotes(notes);
        }
        setFetchNotes(notes);
      } catch (error) {
        toast.error(error.message);
      }
    };

    searchFetch();
  }, [search]);

  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, [userName]);

  const fetchingNotes = async () => {
    try {
      const response = await axios.get(backendUrl + "/getnotes", {
        withCredentials: true,
      });
      if (response.data.success) {
        setFetchNotes(response.data.allNotes);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchingNotes();
  }, []);

  const handleTags = () => {
    if (!tag.trim()) return;
    if (tagsArray.includes(tag)) return;

    setTagsArray((prev) => [...prev, tag]);
    setTag("");
  };

  const handleDelete = (tag) => {
    const newArray = tagsArray.filter((t) => t !== tag);
    setTagsArray(newArray);
  };

  const handleNote = (event) => {
    const { name, value } = event.target;
    setNoteData((note) => ({
      ...note,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        title: noteData.title,
        content: noteData.content,
        tags: tagsArray,
      };
      const response = await axios.post(backendUrl + "/addnote", data, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success("New Note Added");
        setNoteData({ title: "", content: "" });
        setTagsArray([]);
        fetchingNotes();
        setAddNote(false);
        setTag("");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePin = async (id) => {
    try {
      const response = await axios.put(
        backendUrl + `/updatepin/${id}`,
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success("Note Updated Successfully");
        fetchingNotes();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      if (!window.confirm("Delete this Note?")) return;

      const response = await axios.delete(backendUrl + `/deletenote/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.error("Note Deleted successfully");
        fetchingNotes();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Show Data */}
      {fetchNotes.length == 0 ? (
        <div className="text-center mt-10 text-gray-500">
          Start creating your first note! Click the 'Add' button to jot down
          your thoughts, ideas, and <br />
          reminders. Let's get started!
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fetchNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white px-4 py-2 shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h3>
                <BsPin
                  onClick={() => handlePin(note._id)}
                  className={`${note.pin ? "text-blue-600" : "text-gray-400"} cursor-pointer`}
                />
              </div>

              <p className="text-xs text-gray-400 mb-2">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-400 px-1 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-4 text-gray-500">
                <MdModeEdit className="cursor-pointer hover:text-blue-600" />
                <MdDelete
                  onClick={() => handleDeleteNote(note._id)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Notes */}
      {addNote && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white text-black w-100 p-4 rounded relative shadow-lg"
          >
            <button
              onClick={(event) => {
                (event.preventDefault(), setAddNote(false));
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <RxCross2 />
            </button>

            <label className="text-sm text-gray-400">Title</label>
            <input
              type="text"
              name="title"
              value={noteData.title}
              onChange={handleNote}
              placeholder="Enter Your Title"
              required
              className="w-full text-xl text-gray-400 px-2 py-1 mb-2 outline-none rounded"
            />

            <label className="text-sm text-gray-400">Content</label>
            <textarea
              name="content"
              value={noteData.content}
              onChange={handleNote}
              placeholder="Content"
              rows={5}
              required
              className="w-full px-2 py-1 mb-2 outline-none bg-gray-100 rounded"
            />

            <p className="text-sm mb-1 text-gray-400">Tags</p>

            <div className="flex flex-wrap gap-1 mb-2">
              {tagsArray.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 text-xs rounded"
                >
                  # {tag}
                  <RxCross2
                    className="cursor-pointer"
                    onClick={() => handleDelete(tag)}
                  />
                </span>
              ))}
            </div>

            <div className="flex w-15 items-center gap-2 mb-3">
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                type="text"
                placeholder="Add tag"
                className="flex-1 px-2 py-1 border border-gray-200 outline-none rounded text-sm"
              />

              <span
                onClick={handleTags}
                className="p-2 border border-blue-900 rounded"
              >
                <FaPlus className="text-blue-900 text-sm" />
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
              Add
            </button>
          </form>
        </div>
      )}

      <div
        onClick={() => setAddNote(true)}
        className="p-4 bg-blue-600 fixed bottom-5 right-5 rounded-xl cursor-pointer shadow-lg hover:bg-blue-700"
      >
        <FaPlus className="text-white" />
      </div>
    </div>
  );
};

export default Dashboard;
