import React from 'react'

import Link from 'next/link'

function VerificationDeclined() {
    return (
        <div className='notvarifed'>
            <div className='main'>
                <h1>
                    Verification Declined
                </h1>
                <br></br>
                <p>
                    We have looked at your profile and deciede to decline your verification.
                    This could be various reasons you can read our term and conditions.
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

export default VerificationDeclined