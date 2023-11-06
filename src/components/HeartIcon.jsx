import "../Icons.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function HeartIcon() {
    return (
        <div className="beat-icon icon-container">
            <FontAwesomeIcon icon={faHeart} className="ghost-icon" />
        </div>
    );
}