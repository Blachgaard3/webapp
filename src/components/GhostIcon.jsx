

import "../Icons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

export default function GhostIcon() {
    return (
        <div className="beat-icon icon-container">
            <FontAwesomeIcon icon={faGhost} className="ghost-icon" />
        </div>
    );
}