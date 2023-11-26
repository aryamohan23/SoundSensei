import React, { useState } from 'react';

const LoadingModal = ({showModal}) => {
//   const [showModal, setShowModal] = useState(modalOpen);

//   const closeModal = () => {
//     setShowModal(false);
//   };

  return (
    <div>
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={{padding: "5px"}}>Analyzing playlist...</h2>
            <div style={styles.loader}></div>
            {/* <button onClick={closeModal}>Close</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  loader: {
    border: '16px solid #f3f3f3',
    borderTop: '16px solid #3498db',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
  },
};

export default LoadingModal;