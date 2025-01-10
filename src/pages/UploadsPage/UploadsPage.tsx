import React from 'react'

export default function UploadsPage() {
    return (
        <>
            <div>UploadsPage</div>
            <form action="">
                <label htmlFor="file">Choose a file</label>
                <input type="file" id='file' />
                <label htmlFor="file-name">Enter a file name</label>
                <input type="text" id='file-name' />
            </form>

        </>
    )
}
