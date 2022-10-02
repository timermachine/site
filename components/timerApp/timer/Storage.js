import React from 'react';
import QueryString from 'qs';
/*
intended to be a data adapter api.
so can switch/have mutlipe data interfaces such as:
memory
memory with static seed.
qs
local storage
static json
json files
graphql
rest
yada yada...
my sneaky one:
data->server
short url returned.
on visiting short url, hashedId given that loads data. nah - yuk- might be something in this, but i dont see it.
just fucking store it on a server. firebase alternative.


1. url qs : combination of save/retrieve from url, qs parsing.

*/

const testObj = { firstName: 'Joe', lastName: 'Foo' };

/* UI part - to show the data as it is stored/retrieved  (not core)*/
const Storage = ({ data }) => {
  const outie = QueryString.stringify(data);
  const innie = QueryString.parse(outie);

  console.log('qs', 'innie:', innie, 'outie', outie, 'length:', outie.length);
  console.log('outie length:', outie.length);

  return <div>Storage</div>;
};

export default Storage;
