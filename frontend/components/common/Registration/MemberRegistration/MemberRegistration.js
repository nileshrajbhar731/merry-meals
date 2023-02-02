import React, { useState } from 'react'
import { Progress } from '../Progress';
import { AiOutlineUpload } from 'react-icons/ai';

export const MemberRegistration = () => {
    const [onStep2, setOnStep2] = useState(false);
    return (
        <div className={``}>
            <div className='reg_head'>
                <h1 className='reg_title'>New Member Registration</h1>
                <p className='reg_subtitle'>Meals are no longer a problem. Join us now and get free meals for yourself.</p>

                <Progress status={onStep2} prog1Title='Personal Details' prog2Title='Subscription Details' />

                {!onStep2

                    ?

                    <div className='form_container'>

                        <div className='form_row'>
                            <div className='form_grp'>
                                <input type='text' id='f_name' placeholder=" " required />
                                <label htmlFor='f_name'>First Name</label>
                            </div>
                            <div className='form_grp'>
                                <input type='text' id='l_name' placeholder=" " required />
                                <label htmlFor='l_name'>Last Name</label>
                            </div>
                        </div>

                        <div className='form_row'>
                            <div className='form_grp'>
                                <input type='text' id='phn' placeholder=" " required />
                                <label htmlFor='phn'>Phone</label>
                            </div>
                            <div className='form_grp'>
                                <select className='select' name="select" id="select" onchange=" this.dataset.chosen = this.value; ">
                                    <option value="null"></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label for="select">How did you heard about us?</label>
                            </div>
                        </div>

                        <div className='form_row'>
                            <div className='form_grp'>
                                <input type='text' id='reason' placeholder=" " required />
                                <label htmlFor='reason'>Reason for Joining</label>
                            </div>
                            <div className='form_grp'>
                                <input type='file' id='doc' required />
                                <label htmlFor='doc'>Upload Document</label>
                                <AiOutlineUpload className='upload_icon' />
                            </div>
                        </div>

                        <div className='form_row'>
                            <div className='form_grp'>
                                <input type='date' id='dob' placeholder=" " required />
                                <label htmlFor='dob'>Date of Birth</label>
                            </div>
                            <div className='form_grp'>
                                <input type='file' id='profile' required />
                                <label htmlFor='profile'>Profile Photo</label>
                                <AiOutlineUpload className='upload_icon' />
                            </div>
                        </div>

                        <div className='form_row'>
                            <div className='form_grp'>
                                <input type='email' id='email' placeholder=" " required />
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='form_grp'>
                                <input type='password' id='password' placeholder=" " required />
                                <label htmlFor='password'>Password</label>
                            </div>
                        </div>
                        <button className='btn btn_success' onClick={() => { setOnStep2(true) }}>Next</button>

                        {/* <div className='form_row'>
                <div className='form_grp'>
                  <input type='text' id='f_name' required />
                  <label htmlFor='f_name'>First Name</label>
                </div>
                <div className='form_grp'>
                  <input type='text' id='l_name' required />
                  <label htmlFor='l_name'>Last Name</label>
                </div>
              </div> */}

                    </div>

                    :

                    // <button onClick={() => { setOnStep2(false) }}>Back</button>
                    <div className='form_container'>

                        <div className='form_row'>
                            <div className='form_grp'>
                                <input type='text' id='f_name' placeholder=" " required />
                                <label htmlFor='f_name'>Address</label>
                            </div>
                            <div className='form_grp'>
                                <input type='text' id='l_name' placeholder=" " required />
                                <label htmlFor='l_name'>Email</label>
                            </div>
                        </div>
                        <button onClick={() => { setOnStep2(false) }}>Back</button>

                        {/* <div className='form_row'>
                <div className='form_grp'>
                  <input type='text' id='f_name' required />
                  <label htmlFor='f_name'>First Name</label>
                </div>
                <div className='form_grp'>
                  <input type='text' id='l_name' required />
                  <label htmlFor='l_name'>Last Name</label>
                </div>
              </div> */}

                    </div>
                }
            </div>

        </div>
    )
}
