import users from "@/lib/db";

const Users = async () => {
  const usersData = await users.find().toArray();

  return (
    <section>
      <table className="border-collapse max-w-6xl mx-auto">
        <thead>
          <tr>
            <th className="border px-4">Name</th>
            <th className="border px-4">Email</th>
            <th className="border px-4">Gender</th>
            <th className="border px-4">Phone</th>
            <th className="border px-4">Address</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user._id.toString()}>
              <td className="border px-4">
                {user.first_name + " " + user.last_name}
              </td>
              <td className="border px-4">{user.email}</td>
              <td className="border px-4">{user.gender}</td>
              <td className="border px-4">{user.phone}</td>
              <td className="border px-4">{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Users;
