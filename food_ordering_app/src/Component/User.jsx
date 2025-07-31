
const User = (prop) => {
  return (
    <>
      <div className="justify-items-center bd-white shadow-md rounded-2xl mt-5">
        <div className="font-bold">{prop.name}</div>
        <div>{prop.location}</div>
        <div>Contact-no: {prop.contact}</div>
      </div>
    </>
  );
}

export default User