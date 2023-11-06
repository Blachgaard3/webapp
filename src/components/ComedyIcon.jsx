

import "../Icons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';

export default function ComedyIcon() {
    return (
        <div className="beat-icon icon-container">
            <FontAwesomeIcon icon={faLaugh} className="ghost-icon" />
        </div>
    );
}