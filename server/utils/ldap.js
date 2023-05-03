import { Client } from 'ldapts';
import { config } from 'dotenv';
config();

const CONN_STRING = 'dc=iiita,dc=ac,dc=in';

export async function authenticate(username, password) {
  const client = new Client({
    url: process.env.LDAP_SERVER,
  });
  const options = {
    filter: 'uid=' + username,
  };
  let { searchEntries } = await client.search(CONN_STRING, options);
  let cn = searchEntries[0].dn;
  try {
    await client.bind(cn, password);
  } catch (e) {
    client.unbind();
    return false;
  }
  client.unbind();
  return true;
}
