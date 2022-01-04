import React from "react";

const User = ({ user }: { user: { id: number; login: string } }) => {
  //   console.log("User: render");
  return <p>{user.login}</p>;
};

export default User;
