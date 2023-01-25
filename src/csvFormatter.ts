import { Person } from './Person';

export function formatToCSV(personsList: Person[]) {
    let result = `Index,ID,Full Name,Address,Phone\n`;
    personsList.forEach((person, index) => {
        result += `"${index+1}","${person.UUID}","${person.fullName}","${person.address}","${person.phone}"\n`;
    });
    return result;
}
