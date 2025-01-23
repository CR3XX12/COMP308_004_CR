//
function View (props) {
    // read the info from props, coming from the ancestor component
    console.log(props.auth)
    //
    return (
    <div>
    <h2>Welcome to your page {props.username}, you are now
    {props.auth}</h2>
    </div>
    );
    }
    //  

    
    export default View;