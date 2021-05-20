import React from "react";
import Wrapper from "./components/Wrapper";
import Title from './components/Title';
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import axios from "axios";
let sortArrow;

class App extends React.Component {
  state = {
    employees: [],
    searchField: "",
    sortArrow: ""
  };

  componentDidMount() {
    axios.get(
        `https://randomuser.me/api/?inc=name,email,dob,phone,picture,login&results=50`
      )
      .then((res) => {;
        const employees = res.data.results.map((item) => {
          return {
            image: item.picture.thumbnail,
            firstName: item.name.first,
            lastName: item.name.last,
            email: item.email,
            dob: item.dob.date,
            key: item.login.uuid
          }
        })
        this.setState({ employees });
      });
  }

  onSort(event, sortKey) {
    let randomBoolean = Math.random() < 0.5;
    // let randBool=randomBoolean;
    const employees = this.state.employees;
    //ascending
    if(randomBoolean){
      employees.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
      sortArrow="bi bi-caret-down";
      this.setState({ employees, sortArrow })
      return randomBoolean = false

    } else {
    //decending
      employees.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      sortArrow="bi bi-caret-up";
      this.setState({ employees, sortArrow })
      randomBoolean = true
    }
  }
  
  render() {
    const {searchField, employees} = this.state
    const filteredEmp = employees.filter(item => (
      item.firstName.toLowerCase().includes(searchField.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchField.toLowerCase())||
      item.dob.includes(searchField)
    ));

    return (
      <Wrapper>
        <Title />
        <SearchBar handleChange = {(e)=> this.setState({searchField: e.target.value})} handleSubmit = {(e)=> e.preventDefault}/>
        <TableHead>
          <tr>
            <th>Image</th>
            <th className= "sort-button" onClick={e => this.onSort(e, 'firstName')}>Fist Name<i className={this.state.sortArrow}></i></th>
            <th className= "sort-button" onClick={e => this.onSort(e, 'lastName')}>Last Name<i className={this.state.sortArrow}></i></th>
            <th>Email</th>
            <th>DOB</th>
          </tr>
          {filteredEmp.map((item) => (
            <TableBody
              image={item.image}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              dob={item.dob}
              key={item.key}
            />
          ))}
        </TableHead>
      </Wrapper>
    );
  }
}
export default App;
