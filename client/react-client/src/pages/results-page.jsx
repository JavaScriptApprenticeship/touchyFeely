import React, {Component} from 'react';
import TwitterSearch from '../components/twitter/twitter-search';
import Axios from 'axios';

class ResultsPage extends Component {
    state = {
        users: []
    }
    componentDidMount(){
        Axios.get(`http://localhost:3021/api/v1/user`)
          .then(result => {
              const users = result.data;
              this.setState({
                  users
              })
          })
    }
 
    render(){
        const {users} = this.state;
        console.log('users: ',users)
        return(
            <div>
                <h2>this is the results</h2>
                {users.length && <h2>keyword: {users[users.length -1].keywords}</h2>}
                {users.length && <TwitterSearch
                  keyword={users[users.length -1].keywords}/>}
            </div>
          )
    }
  

}
export default ResultsPage;