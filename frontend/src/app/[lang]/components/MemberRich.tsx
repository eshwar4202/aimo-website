'use client';
import AboutMembers from "./AboutMembers";
import { useState } from "react";
import ShowForm from "./ShowForm";

interface MemberProps {
  data: {
    title: string;
    body?: string;

  };
}

const SubMenu = ({ data }: MemberProps) => {
   const [showMembers, setShowMembers] = useState(true);
   const [showForm, setShowForm] = useState(false);
  // Function to handle 'Members' click
  const handleMembersClick = () => {
    setShowMembers(true);
    setShowForm(false);
    // Add your logic here (e.g., navigate, display members, etc.)
  };

  // Function to handle 'Form' click
  const handleFormClick = () => {
    setShowMembers(false);
    setShowMembers(false);
    // Add your logic here (e.g., navigate, display form, etc.)
  };

  return (
    <div>
    <div className="flex justify-center mt-10">
      <div className="flex space-x-4">
        <button
          onClick={handleMembersClick}
          className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          Members
        </button>
        <button
          onClick={handleFormClick}
          className="px-4 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
        >
          Form
        </button>
      </div>
    </div>
    <div className="mt-6">
       {showMembers && <AboutMembers data={data} />}
    </div>

    <div className="mt-6">
      {showForm && <ShowForm data={data} />}
    </div>

    </div>
     );
};

export default SubMenu;

