export const formatJoinDate = (dateString, withTime = false) => {
    const date = new Date(dateString);

    if (withTime) {
        return `Joined on ${date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })}`;
    }

    return `Joined on ${date.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    })}`;
};
