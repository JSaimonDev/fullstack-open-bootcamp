import {useState} from 'react'

const Toggleable = ({children, buttonShow, buttonHide}) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonShow}</button>
            </div>
            <div style={showWhenVisible}>
            {children}
                <button onClick={toggleVisibility}>{buttonHide}</button>
            </div>
        </div>
    )
}

export default Toggleable



