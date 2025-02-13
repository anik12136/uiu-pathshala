import React from 'react';

const UserDetailsModal = ({user}) => {
    return (
        <div>
            {/* <button className="" onClick={() => document.getElementById('my_modal_2').showModal()}>Details...</button> */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                <h3 className="font-bold text-lg">{user.name}</h3>
                    <h3 className="font-bold text-lg">{user.email}</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    );
};

export default UserDetailsModal;