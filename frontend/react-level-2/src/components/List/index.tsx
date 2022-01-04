import React from "react";
import { GitHubReturn } from "../../hooks/useDataApi";

import User from "../User";

const List = ({ listUsers }: { listUsers: GitHubReturn }) => {
  //   console.log("List: Render");

  return (
    <>
      {listUsers?.items?.map((user) => (
        <User key={user.id} user={user} />
      ))}
      {listUsers?.total_count === 0 && (
        <p>la recherche ne comporte aucun résultat </p>
      )}
    </>
  );
};

export default List;
