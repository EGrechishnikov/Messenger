import React from 'react';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            avatar: undefined
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onNameChange(event) {
        let currentUser = this.state.currentUser;
        currentUser.name = event.target.value;
        this.setState({currentUser: currentUser});
    }

    onFileUpload(event) {
        this.setState({avatar: event.target.files[0]});
    }

    render() {
        let avatar = this.state.currentUser.attachment;
        if (avatar) {
            let src = `data:image;base64,${avatar.content}`;
            avatar = <img src={src} alt='avatar'/>;
        }
        return(
            <div>
                <h1>{this.state.currentUser.login}</h1>
                {avatar}
                <form onSubmit={this.props.save.bind(null, this.state.currentUser, this.state.avatar)}>
                    <input type='text'
                           value={this.state.currentUser.name ? this.state.currentUser.name : ''}
                           onChange={this.onNameChange}/>
                    <input type='file'
                           value={this.state.currentUser.avatar}
                           onChange={this.onFileUpload}/>
                    <button type='submit'>Сохранить</button>
                </form>
            </div>
        );
    }
}

export default UserDetail;