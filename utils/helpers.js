module.exports = {
    eq: (a, b) => a === b,

    format_date: (date) => {
        // Using JavaScript Date methods, we get and format the month, date, and year
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            // We add five years to the 'year' value to calculate the end date
            new Date(date).getFullYear()
            }`;
    },

    format_timestamp: (date) => {
        let p = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).formatToParts(date).reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});

        return `${p.month}/${p.day}/${p.year}, ${p.hour}:${p.minute} ${p.dayPeriod}`;
    },
}