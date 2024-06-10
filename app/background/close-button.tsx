"use client";

import { useBackgroundContext } from "../home/layout-context";

const CloseButton: React.FC = () => {
    const { setShowBackground } = useBackgroundContext();

    return (
        <button
            className="close-button glass"
            onClick={() => setShowBackground(false)}
        >
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M23.8242 8.82422C24.5566 8.0918 24.5566 6.90234 23.8242 6.16992C23.0918 5.4375 21.9023 5.4375 21.1699 6.16992L15 12.3457L8.82422 6.17578C8.0918 5.44336 6.90234 5.44336 6.16992 6.17578C5.4375 6.9082 5.4375 8.09766 6.16992 8.83008L12.3457 15L6.17578 21.1758C5.44336 21.9082 5.44336 23.0977 6.17578 23.8301C6.9082 24.5625 8.09766 24.5625 8.83008 23.8301L15 17.6543L21.1758 23.8242C21.9082 24.5566 23.0977 24.5566 23.8301 23.8242C24.5625 23.0918 24.5625 21.9023 23.8301 21.1699L17.6543 15L23.8242 8.82422Z"
                    fill="white"
                />
            </svg>
        </button>
    );
};

export default CloseButton;
