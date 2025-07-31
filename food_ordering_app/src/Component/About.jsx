import React from 'react'
import User from './user'
import UserClass from './userClass';

const About = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">About Us</h1>
      {/* <User
        className="mt-1"
        name="priyanshi"
        location="garoth"
        contact="123456789"
      /> */}
      <UserClass
        className=""
        name="priyanshi"
        location="garoth"
        contact="123456789"
      />
    </div>
  );
}

export default About
