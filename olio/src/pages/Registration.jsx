import React, { useState } from 'react';
import './styles.css'; // Import your custom styles
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    date: '',
    state: '',
    address: '',
    hobby: [],
    resume: null,
  });
  const [newHobby, setNewHobby] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedHobbies;
    if (checked) {
      updatedHobbies = [...formData.hobby, name];
    } else {
      updatedHobbies = formData.hobby.filter((hobbies) => hobbies !== name);
    }
    setFormData({ ...formData, hobby: updatedHobbies });
  };

  const handleNewHobbyChange = (e) => {
    setNewHobby(e.target.value);
  };

  const handleAddHobby = () => {
    if (newHobby) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hobby: [...prevFormData.hobby, newHobby],
      }));
      setNewHobby('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.hobby.length < 2) {
      setValidationError('Select at least 2 hobbies.');
    } else {
      setValidationError('');
      console.log(formData);


      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('resume', formData.resume);
      for (let i = 0; i < formData.hobby.length; i++) {
        formDataToSend.append('hobby', formData.hobby[i]);
      }



      axios.post(`http://localhost:8000/add-data`, formDataToSend)
        .then((data) => {
          console.log(data)
          navigate("/")
        }).catch((err) => {
          console.log(err)
        })


    }
  };

  return (
    <div className="resume-page">
      <h1 className="text-3xl font-bold mb-4">Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            className="border rounded p-2"
            value={formData.name}
            onChange={onChangeHandler}
            name="name"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Gender:</label>
          <div>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="male"
                className="mr-1"
                checked={formData.gender === 'male'}
                onChange={() => setFormData({ ...formData, gender: 'male' })}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-1"
                checked={formData.gender === 'female'}
                onChange={() => setFormData({ ...formData, gender: 'female' })}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1">Date of Birth:</label>
          <input
            type="date"
            className="border rounded p-2"
            value={formData.date}
            onChange={onChangeHandler}
            name="date"
            required
          />
        </div>
        <div>
          <label className="block mb-1">State:</label>
          <input
            type="text"
            className="border rounded p-2"
            value={formData.state}
            onChange={onChangeHandler}
            name="state"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Address:</label>
          <textarea
            className="border rounded p-2"
            value={formData.address}
            onChange={onChangeHandler}
            name="address"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Hobbies:</label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              className="border rounded p-2 mr-2"
              placeholder="Add a hobby"
              value={newHobby}
              onChange={handleNewHobbyChange}
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={handleAddHobby}
            >
              Add Hobby
            </button>
          </div>
          <div>
            {formData.hobby.map((hobbies) => (
              <label className="mr-2" key={hobbies}>
                <input
                  type="checkbox"
                  name={hobbies}
                  className="mr-1"
                  checked={true}
                  onChange={handleCheckboxChange}
                />
                {hobbies}
              </label>
            ))}
          </div>
          {validationError && (
            <div className="text-red-600">{validationError}</div>
          )}
        </div>
        <div>
          <label className="block mb-1">Upload Resume (.docx):</label>
          <input
            type="file"
            accept=".docx"
            className="border p-2"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registration;
