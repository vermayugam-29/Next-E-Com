import React, { useEffect } from 'react';

const Logout: React.FC = ({ }) => {
  
  const openModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    openModal();
  }, [])


  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello! From RPR Steel Works</h3>
          <p className="py-4">Are you sure you want to Log Out</p>
          <div className="modal-action">
            <form method="dialog" className='flex gap-2'>
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
              <button onClick={() => alert('Hi there')} className='btn'>Log Out</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Logout;
