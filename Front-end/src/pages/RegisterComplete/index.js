import {Component} from 'react'

class RegisterCompleted extends Component{
    constructor(props) {
        super(...props)
        this.state = {
            name: "",
            password: "",
            repassword: "",
            email: "",
        }
    }

    componentDidMount() {
        document.title = "Register";
    }

    render(){
        return(
            <div>Dang ky thanh cong,vui long check mail</div>
        )
    }
};
export default RegisterCompleted