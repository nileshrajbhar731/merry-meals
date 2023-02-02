import Link from 'next/link'
import React from 'react'

function VerificationPending() {

  return (
    <div className='notvarifed'>
    <div className='main'>
    <h1>
        Verification Pending
        </h1>
        <br></br>
        <p>
        You are not verified yet. Please wait till we review your profile. 
        Once your profile is verified you will be able to login.
        </p>
        <br></br>
        {/* <a href='/login'>
        <button>Go Back</button>
        </a> */}
        <Link href="/login"><button>Go Back</button></Link>
    </div>
    </div>
  )
}

export default VerificationPending