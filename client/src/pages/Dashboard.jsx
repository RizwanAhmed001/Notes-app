// import { useState } from "react";
// import { FaPlus } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";

// const Dashboard = () => {
//   const [addNote, setAddNote] = useState(false);

//   const [tag, setTag] = useState("");

//   const [tagsArray, setTagsArray] = useState([]);

//   const handleTags = () => {
//     if (!tag.trim()) return;

//     if (tagsArray.includes(tag)) return; // prevent duplicate

//     setTagsArray((prev) => [...prev, tag]);
//     setTag("");
//   };

//   const handleDelete = (tag) => {
//     const newArray = tagsArray.filter((t) => t !== tag);
//     setTagsArray(newArray);
//   };

//   return (
//     <div>
//       {addNote && (
//         <div className="fixed top-15">
//           <button
//             onClick={() => setAddNote(false)}
//             className="absolute top-2 right-2"
//           >
//             <RxCross2 />
//           </button>
//           <label htmlFor="title">Title</label>
//           <input type="text" id="title" placeholder="Title" />
//           <label htmlFor="content">Content</label>
//           <textarea type="text" id="content" placeholder="Content" />
//           {/* Tags */}
//           <p>Tags</p>
//           <div>
//             {tagsArray.map((tag, index) => (
//               <span key={index}>
//                 # {tag} <RxCross2 onClick={() => handleDelete(tag)} />
//               </span>
//             ))}
//           </div>
//           <div>
//             <div>
//               <input
//                 value={tag}
//                 onChange={(event) => setTag(event.target.value)}
//                 type="text"
//                 placeholder="Add Tags"
//               />
//               <button onClick={handleTags}>
//                 <FaPlus />
//               </button>
//             </div>
//           </div>
//           <button>Add</button>
//         </div>
//       )}

//       {/* Add Note */}
//       <div
//         onClick={() => setAddNote(true)}
//         className="p-5 bg-blue-600 fixed bottom-5 right-5 rounded-xl"
//       >
//         <FaPlus className="text-white" />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const [addNote, setAddNote] = useState(false);
  const [tag, setTag] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

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

  return (
    <div>

      {/* Add Note */}
      {addNote && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          
          {/* Modal */}
          <div className="bg-white text-black w-100 p-4 rounded relative shadow-lg">

            {/* Close */}
            <button
              onClick={() => setAddNote(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <RxCross2 />
            </button>

            {/* Title */}
            <label className="text-sm text-gray-400">Title</label>
            <input
              type="text"
              placeholder="Enter Your Title"
              className="w-full text-xl text-gray-400 px-2 py-1 mb-2 outline-none rounded"
            />

            {/* Content */}
            <label className="text-sm text-gray-400">Content</label>
            <textarea
              placeholder="Content"
              rows={5}
              className="w-full px-2 py-1 mb-2 outline-none bg-gray-100 rounded"
            />

            {/* Tags */}
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

            {/* Add Tag */}
            <div className="flex w-15 items-center gap-2 mb-3">
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                type="text"
                placeholder="Add tag"
                className="flex-1 px-2 py-1 border border-gray-200 outline-none rounded text-sm"
              />

              <button
                onClick={handleTags}
                className="p-2 border border-blue-900 rounded"
              >
                <FaPlus className="text-blue-900 text-sm" />
              </button>
            </div>

            {/* Submit */}
            <button className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
              Add
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
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