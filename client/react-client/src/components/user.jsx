import React from 'react';
import {Link} from 'react-router-dom';
import superagent from 'superagent';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            // moves: 0,
            keywords: '',
            view: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({view: true});
        const { name, keywords } = this.state;
        return superagent.post('http://localhost:3021/api/v1/user')
        .send({"name": name, "keywords": keywords})
        .then(res => {
           return res;
        })
    }
            
    handleChange = e => {
        const {name, value } = e.target;
        this.setState({[name]: value});
    }
  

    render() {
      return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <input 
                type='text' 
                name='name' 
                value={this.name}
                placeholder='enter your name'
                onChange={this.handleChange}
                />
                <p>{`Hi, ${this.state.name} enter some keywords below and we'll search Twitter to get the general sentiment about...`}</p>
                 <input 
                type='text' 
                name='keywords' 
                value={this.keywords}
                placeholder='enter keywords separated by a comma'
                onChange={this.handleChange}
                />
                <button type="submit" >submit</button>
                {this.state.view && <Link to="/results">
                <button type="submit">Go next page</button>
                </Link>}
            </form>
            <h2>{this.state.name}</h2>
            <h2>{this.state.keywords}</h2>
        </div>
    )
}

}

export default User;