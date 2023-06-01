interface NotificationProps {
    message: string
}

const Notification = ({message}: NotificationProps) => {
    if(!message) null
    return (
        <div className="errorMessage">
            {message}
        </div>
    )
}

export default Notification