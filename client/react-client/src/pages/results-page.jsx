import React, {Component} from 'react';
import TwitterSearch from '../components/twitter/twitter-search';
import Axios from 'axios';
import './results-page.styles.scss';

class ResultsPage extends Component {
    state = {
        users: []
    }
    async componentDidMount(){
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
        return(
            <div className='results-container'>
                <h2>Here are your results for:</h2>
                {users.length && <h2>Your keyword: {users[users.length -1].keywords}</h2>}
                {users.length && <TwitterSearch
                  keyword={users[users.length -1].keywords}/>}
            </div>
          )
    }
}
export default ResultsPage;
