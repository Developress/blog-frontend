export function getReadableDatetime(datetime){
    let dateFormat = require('dateformat');
    const datetime_obj = Date(datetime);
    return dateFormat(datetime_obj, "HH:MM dd/mm/yyyy");
}