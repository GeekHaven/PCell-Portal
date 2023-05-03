import {Client} from "ldapts";
const CONN_STRING = "dc=iiita,dc=ac,dc=in";

const authenticate = async (username, password) => {
  const client = new Client({
    url: "ldap://172.31.1.41",
  });
  const options = {
    filter: "uid=" + username,
  };
  let { searchEntries } = await client.search(CONN_STRING, options);
  let cn = searchEntries[0].dn;
  try {
    await client.bind(cn, password);
  }catch(e){
    client.unbind();
    return false;
  }
  client.unbind();
  return true;
};