const { listContacts, getContactById, addContact, removeContact } = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        listContacts().then((contactsList) => console.table(contactsList));
      break;
    case "get":
        getContactById(id).then((contact) => console.table(contact));
      break;
    case "add":
        addContact(name, email, phone).then((newContact) => console.table(newContact));
      break;
    case "remove":
        removeContact(id).then((removedContact) => console.table(removedContact));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
