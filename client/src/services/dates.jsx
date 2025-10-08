const formatTime = (time) => {
    if (time === null || time === undefined) return '';
    const timeString = String(time).padStart(4, '0');
    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = timeString.substring(2, 4);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
};

const formatRemainingTime = (dateString) => {
    if (!dateString) return '';

    const eventDate = new Date(dateString);
    const now = new Date();

    eventDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return 'Event has passed';
    } else if (diffDays === 0) {
        return 'Event is today!';
    } else if (diffDays === 1) {
        return 'Event is tomorrow!';
    } else {
        return `${diffDays} days remaining`;
    }
};

const formatNegativeTimeRemaining = (remainingString, eventId) => {
    if (remainingString === 'Event has passed') {
        const element = document.getElementById(`remaining-${eventId}`);
        if (element) {
            element.classList.add('passed-event');
        }
    }
};


const dates = {
    formatTime,
    formatRemainingTime,
    formatNegativeTimeRemaining,
};

export default dates;