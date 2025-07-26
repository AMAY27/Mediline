import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {signup} from '../actions/auth';
import { useSelector } from 'react-redux';

const Registeruser = ({ signup }) => {
  const [userCreated, setuserCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    birthDate: '',
    contact: '',
    city: '',
    pincode: '',
    password: '',
    re_password: ''
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactValid, setIsContactValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const signupSuccess = useSelector(state => state.auth.signupSuccess);
  const signupError = useSelector(state => state.auth.signupError);

  const validateContact = async (contact) => {
    const regex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/ // Basic validation for contact number format
    if (!regex.test(contact)) {
      setIsContactValid(false);
      setContactError('Please enter a valid contact number');
    } else {
      setIsContactValid(true);
      setContactError('');
    }
  };

  const validateEmail = async (email) => {
      const regex = /\S+@\S+\.\S+/;
      if (!regex.test(email)) {
        setIsEmailValid(false);
        setEmailError('Please enter a valid email address');
      } else {
        setIsEmailValid(true);
        setEmailError('');
      }
  };

  useEffect(() => {
    if (values.email) validateEmail(values.email);
  }, [values.email]);

  useEffect(() => {
    if (values.contact) validateContact(values.contact);
  }, [values.contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password === values.re_password) {
      setLoading(true);
      const { re_password, ...userData } = values;
      await signup(userData);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return; // Only act after loading is false
    if (signupSuccess) {
      alert('Signup success');
      setValues({
        email: '',
        first_name: '',
        last_name: '',
        gender: '',
        birthDate: '',
        contact: '',
        city: '',
        pincode: '',
        password: '',
        re_password: ''
      });
      setStep(1);
      setuserCreated(true);
    } else if (signupError) {
      alert('User creation failed');
      setValues({
        email: '',
        first_name: '',
        last_name: '',
        gender: '',
        birthDate: '',
        contact: '',
        city: '',
        pincode: '',
        password: '',
        re_password: ''
      });
      setStep(1);
    }
  }, [signupSuccess, signupError, loading]);
  if (userCreated) {
    navigate('/loginuser');
  }

  return (
    <div>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50'>
          <div className='text-center'>
            <div className='loader mb-4'></div>
            <p className='text-lg font-semibold text-green-600'>Registering user...</p>
          </div>
        </div>
      )}
      <div className='md:h-screen md:justify-center flex items-center flex-col'>
        <div className='w-[40%]'>
          {/* {signupSuccess && <p className="text-green-500">{signupSuccess}</p>} */}
          {/* {signupError && <p className="text-red-500">{signupError}</p>} */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              {/* ...existing code for first_name, last_name, email... */}
              <div className='mb-4'>
                <label htmlFor="first_name" className='block text-gray-700 text-sm font-bold mb-2'>First Name</label>
                <input
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  value={values.first_name}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor="last_name" className='block text-gray-700 text-sm font-bold mb-2'>Last Name</label>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='last_name'
                  value={values.last_name}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
                {!isEmailValid && <p className="text-red-500 text-sm my-2">{emailError}</p>}
              </div>
              <div className='flex items-center justify-between'>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              {/* ...existing code for gender, birthDate, contact... */}
              <div className='mb-4'>
                <label htmlFor="gender" className='block text-gray-700 text-sm font-bold mb-2'>Gender</label>
                <select
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                >
                  <option value='' disabled>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>
              <div className='mb-4'>
                <label htmlFor="birthDate" className='block text-gray-700 text-sm font-bold mb-2'>Birth Date</label>
                <input
                  type='date'
                  name='birthDate'
                  value={values.birthDate}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor="contact" className='block text-gray-700 text-sm font-bold mb-2'>Contact</label>
                <input
                  type='tel'
                  placeholder='+1235556698'
                  name='contact'
                  value={values.contact}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                {!isContactValid && <p className="text-red-500 text-sm">{contactError}</p>}
                {!isContactValid && <p className="text-gray-500 text-sm">Contact with country code: +1235556698</p>}
              </div>
              <div className='flex items-center justify-between'>
                <button type='button' onClick={prevStep} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <div className='mb-4'>
                <label htmlFor="city" className='block text-gray-700 text-sm font-bold mb-2'>City</label>
                <input
                  type='text'
                  placeholder='City'
                  name='city'
                  value={values.city}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor="pincode" className='block text-gray-700 text-sm font-bold mb-2'>Pincode</label>
                <input
                  type='text'
                  placeholder='Pincode'
                  name='pincode'
                  value={values.pincode}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <button type='button' onClick={prevStep} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 4 && (
            <form onSubmit={handleSubmit} className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <div className='mb-6'>
                <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-6'>
                <label htmlFor="re_password" className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='Retype Password'
                  name='re_password'
                  value={values.re_password}
                  onChange={handleChange}
                  className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button type='button' onClick={prevStep} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(null, { signup })(Registeruser);